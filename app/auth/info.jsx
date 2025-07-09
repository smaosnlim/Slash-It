import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { app } from '../../backend/firebase';

export default function Info({route}) {

    const navigation = useNavigation();
    const {userEmail, otherParams} = route.params;

    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [interests, setInterests] = useState('');

    const saveInfo = async () => {

        try {

            const userId = getAuth(app).currentUser.uid;
            console.log("User ID:", userId);

            const db = getFirestore(app);

            setDoc(doc(db, 'slash-it-users', userId), {
                email: userEmail,
                age: age,
                occupation: occupation,
                interests: interests.split(',').map(interest => interest.trim()),
                friends: [],
              }, {merge: true}).then(() => {
                console.log('Firestore write completed');
            }).catch((error) => {
                console.error('Error writing to Firestore:', error);
                Alert.alert('Error', 'Failed to save information. Please try again.');
            })

            /*
            setDoc(doc(collection(db, `slash-it-users/${userId}/friends`), 'placeholder'), {
                initialized: true,
            }, {merge: true}).then(() => {
                console.log('Friends collection initialized');
            }).catch((error) => {
                console.error('Error initializing friends collection:', error);
            });
            */


            /*
            const querySnapshot = await getDocs(collection(db, "slash-it-users"));
              querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
              });

            */
            /*
            //const collectionRef = collection(db, 'slash-it-users');
            const userDocRef = doc(db, 'slash-it-users', userId);
            console.log('Writing to Firestore: slash-it-users/', userId);
            await setDoc(userDocRef, {
              age: age,
              occupation: occupation,
              interests: interests.split(',').map(interest => interest.trim()),
              //createdAt: serverTimestamp(),
            });
            console.log('Firestore write completed');

            */

            Alert.alert("Success", "Information saved successfully!");
            navigation.navigate('login');
        } catch (error) {
            Alert.alert('Error', error.message || "Something went wrong");
        }
    }

    return (
            <LinearGradient
                colors={['#1A1A2E', '#16213E']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.container}
            >
            <SafeAreaView style={styles.view}>
            <ScrollView>
                <Image 
                    source={require("../../assets/images/slash-it-logo.png")}
                    style={styles.image}
                />
                
                <Text style={styles.text}>Age</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your age"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                />
                <Text style={styles.text}>Occupation</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your occupation"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={occupation}
                  onChangeText={setOccupation}
                />
                <Text style={styles.text}>Interests (comma-separated)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="E.g., reading, gaming, hiking"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={interests}
                  onChangeText={setInterests}
                />
                <Pressable style={styles.button} onPress={saveInfo}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('login')}>
                    <Text style= {styles.text}>Already have an account? Log In</Text>
                </Pressable>
            </ScrollView>
            </SafeAreaView>
            </LinearGradient>
        
      )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: 200,
    height: 200,
    //marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 8,
    marginLeft: 10,
    width: '100%',
    marginTop: 15
  },
  textInput: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    width: '100%',
    backgroundColor: '#00D4FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: 10
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 18,
    fontWeight: '600',
  },
});