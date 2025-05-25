import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  return (
    <LinearGradient
      colors={['#1A1A2E', '#16213E']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.view}>
        <Image 
          source={require("../assets/images/slash-it-logo.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your username"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Password"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={() => router.push('/home')}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
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
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 18,
    fontWeight: '600',
  },
});
