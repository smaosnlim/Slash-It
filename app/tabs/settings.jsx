import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { app } from '../../backend/firebase';

export default function Settings({ navigation }) {
  const [age, setAge] = useState(0);
  const [occupation, setOccupation] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    const db = getFirestore(app);
    const userId = getAuth(app).currentUser.uid;
    const docRef = doc(db, 'slash-it-users', userId);
    try {
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAge(data.age || 0);
          setOccupation(data.occupation || '');
          setInterests(data.interests ? data.interests.join(', ') : '');
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth(app));
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
            <Text style={styles.title}>Settings</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.section}>
              <Text style={styles.sectionText}>Profile</Text>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Age:</Text>
                <Text style={styles.profileValue}>{age || 'Not set'}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Occupation:</Text>
                <Text style={styles.profileValue}>{occupation || 'Not set'}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Interests:</Text>
                <Text style={styles.profileValue}>{interests || 'Not set'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 150,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgb(26, 26, 46)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  section: {
    width: '100%',
    alignItems: 'center',
  },
  sectionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  profileLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
  profileValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
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
  logoutButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});