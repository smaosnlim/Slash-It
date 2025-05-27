import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../backend/firebase';

export default function SignUp({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (!email || !password) {
            Alert.alert('Error', 'Email and password are required');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Account created successfully!");
            //router.push('/login');
            navigation.navigate('login');
          } catch (error) {
            console.error("Signup Error: ", error.code, error.message);
            let errorMessage = 'Something went wrong';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'The email address is not valid.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'The password is too weak.';
            }
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
        <View style={styles.view}>
            <Image 
                source={require("../../assets/images/slash-it-logo.png")}
                style={styles.image}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your Password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Text style={styles.text}>Re-enter Password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Re-Enter your Password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <Pressable style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('login')}>
                <Text style= {styles.text}>Already have an account? Log In</Text>
            </Pressable>
        </View>
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
    width: 150,
    height: 150,
    marginBottom: 20,
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
