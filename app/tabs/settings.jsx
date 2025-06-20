import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { app } from '../../backend/firebase';

export default function Settings({navigation}) {

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
            })} catch (error) {
                console.error("Error getting document:", error);
            }
        });

    return (
        <SafeAreaView style = {styles.outerContainer}>
            <View style = {styles.container}>
                <Text>{age}</Text>
                <Text>{occupation}</Text>
                <Text>{interests}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    button: {
        width: 100,
        backgroundColor: "cyan",
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        margin: 10
    }

    }
);