import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { app } = require('../../backend/firebase'); 


export default function Friends({ navigation }) {

  const [showOverlay, setShowOverlay] = useState(false);
  //const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [reqFrom, setReqFrom] = useState([]); 
  

  const db = getFirestore(app);
  const currentUserId = getAuth(app).currentUser.uid;

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const handleSearch = async (searchText) => {
    try {
      const usersRef = collection(db, 'slash-it-users');
      const normalizedQuery = searchText.toLowerCase();
      /*
      const q = query(usersRef, 
        where('email', '>=', searchText.toLowerCase()), 
        where('email', '<=', searchText.toLowerCase() + '\uf8ff')
      );
      */
      //console.log(searchText)
      //Must be exact match in email
      const q = query(usersRef, where('email', '==', normalizedQuery));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== currentUserId);
      setSearchResult(results);
      //console.log(results)
    } catch (error) {
      console.error('Error searching users:', error);
      alert('Failed to search users.');
    }
  };

  const handleAddFriend = async (toUserId) => {
    try {
      const friendRequestsRef = collection(db, 'friend-requests');
      await addDoc(friendRequestsRef, {
        fromUserId: currentUserId,
        toUserId,
        status: 'pending',
        //createdAt: serverTimestamp(),
      });
      alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request.');
    }
  }

  const getEmailsFromUserIds = async (userIds) => {
  try {
    const emails = [];
    for (const userId of userIds) {
      const userDoc = await getDoc(doc(db, 'slash-it-users', userId));
      emails.push(userDoc.exists() ? userDoc.data().email : 'Unknown');
    }
    return emails;
    } catch (error) {
      console.error('Error fetching user emails:', error);
      return [];
    }
  };

  const findRequests = async () => {
    
    const reqRef = collection(db, 'friend-requests');
    const q = query(reqRef, where('toUserId', '==', currentUserId), where('status', '==', 'pending'));
    //console.log(currentUserId);
    const pendingRequests = await getDocs(q);
    const reqResults = pendingRequests.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.id !== currentUserId);
    //setReqFrom(reqResults);
    //console.log(reqResults.length);

    const tempReqId = reqResults.map(item => item.id);
    const tempReqFrom = reqResults.map(item => item.fromUserId);
    //DISPLAYS USER IDS THAT REQUESTS CAME FROM
    console.log(tempReqId);
    console.log(tempReqFrom);
    const reqEmails = await getEmailsFromUserIds(tempReqFrom);
    //console.log(reqEmails);
    const updatedReqResults = reqResults.map((item, index) => ({
      email: reqEmails[index],
      requestId: item.id,
      fromUserId: item.fromUserId,
      //requestId: tempReqId[index],
      //fromUserId: tempReqFrom[index],
    }));
    setReqFrom(updatedReqResults);
  }

  const handleAcceptRequest = async (requestId, fromUserId) => {
    try {
      await updateDoc(doc(db, 'friend-requests', requestId), { status: 'accepted' });
      await updateDoc(doc(db, `slash-it-users/${currentUserId}`), {
        friends: arrayUnion(fromUserId),
      });
      await updateDoc(doc(db, `slash-it-users/${fromUserId}`), {
        friends: arrayUnion(currentUserId),
      });
      alert('Friend request accepted!');
      findRequests();
    } catch (error) {
      console.error('Error accepting friend request:', error);
      alert('Failed to accept friend request.');
    }

  }

  const handleRejectRequest = async (requestId) => {
    try {
      //await deleteDoc(doc(db, 'friend-requests', requestId));
      await updateDoc(doc(db, 'friend-requests', requestId), { status: 'rejected' });
      alert('Friend request rejected.');
      findRequests();
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      alert('Failed to reject friend request.');
    }
    
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <LinearGradient
        colors={['#1A1A2E', '#16213E']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Friends</Text>
          </View>
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by username"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                onChangeText={handleSearch}
              />
            </View>
            <Pressable onPress={() => {
              toggleOverlay();
              findRequests();
              }}
              style={styles.notificationContainer}
              
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
                style={styles.notificationIcon}
              />
            </Pressable>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.card}>
              <Text style={styles.sectionText}>Search Results</Text>
              <FlatList
                data={searchResult}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={styles.results}>
                    <Ionicons
                      name="person-outline"
                      size={36}
                      color="#FFFFFF"
                      style={styles.notificationIcon}
                    />
                    <Text style={styles.resultText}>{item.email}</Text>
                    <Pressable onPress={() => handleAddFriend(item.id)} style={styles.addButton}>
                      <Text>Add</Text>
                    </Pressable>
                  </View>
                )}
              />
              
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.buttonText}>Home</Text>
              </Pressable>
            </View>
          </View>
          {/*
          <View style={styles.friendsSidebar}>
            <View style={styles.friendsContent}>
              <Text style={styles.friendsText}>Your Friends</Text>
            </View>
          </View>
          */}
          {showOverlay && (
            <View style={styles.overlayBackground}>
              <View style={styles.overlayCard}>
                <Text style={styles.overlayTitle}>Incoming Friend Requests</Text>
                <View style={styles.sectionPlaceholder}>
                  {/*<Text style={styles.sectionText}>No pending requests</Text>*/}
                  <FlatList
                    data={reqFrom}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.reqFrom}>
                        {/*<Ionicons
                          name="person-outline"
                          size={24}
                          color="#FFFFFF"
                          style={styles.notificationIcon}
                        />*/}
                    <Text style={styles.resultText}>{item.email}</Text>
                    <Pressable onPress={() => handleAcceptRequest(item.requestId, item.fromUserId)} style={styles.acceptButton}>
                      {/*<Text>Accept</Text>*/}
                      <Ionicons
                        name="checkmark-outline"
                        size={16}
                        color="#50C878"                       
                        style={styles.notificationIcon}
                      />
                    </Pressable>
                    <Pressable onPress={() => handleRejectRequest(item.requestId)} style={styles.acceptButton}>
                      <Ionicons
                        name="close-outline"
                        size={16}
                        color="#FF0000"
                        style={styles.notificationIcon}
                      />
                      </Pressable>
                  </View>
                )}
              />
                </View>
                <Pressable
                  style={styles.closeButton}
                  onPress={toggleOverlay}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 150,
    position: 'relative',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  notificationContainer: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  notificationIcon: {
    alignSelf: 'center',
    padding: 10
  },
  mainContent: {
    alignItems: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: 'rgb(26, 26, 46)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    maxWidth: 1000,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  sectionPlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 0,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
    height: 400,
  },
  sectionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    margin: 10,
  },
  button: {
    width: 160,
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: 5,
    minHeight: 50,
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  friendsSidebar: {
    position: 'absolute',
    right: 10,
    top: 150,
    width: 80,
    height: 80,
    backgroundColor: 'rgb(26, 26, 46)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 5,
  },
  friendsContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  friendsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayCard: {
    backgroundColor: 'rgb(26, 26, 46)',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    width: 120,
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  results: {
    padding: 20,
    flexDirection: 'row',
  },
  resultText : {
    color: "white",
    padding: 20,
    paddingTop: 20,
    
  },
  addButton: {
    padding: 15,
    marginLeft: 10,
    backgroundColor: 'skyblue',
    borderRadius: 20,
    justifyContent: 'center',
  },
  acceptButton: {
    //padding: 15,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
  },
  reqFrom: {
    padding: 20,
    flexDirection: 'row',
    alignItems: "flex-end",
    justifyContent: 'flex-end',
  }
});