import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

/*
const handlePress = () => {
  console.log("Welcome, Logged In");
  navigation.navigate('home');
}
  */

export default function Login({navigation}) {

  return (
    <LinearGradient
      colors={['#5de0e6', '#004aad']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
    <View style = {styles.view}>
      <Image 
        source={require("../assets/images/slash-it-logo.png")}
        //resizeMode='contain' 
        style={styles.image}
      />
      <Text style = {styles.text}>Username</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your username"
        placeholderTextColor="#FFF"
      />
      <Text style = {styles.text}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your Password"
        placeholderTextColor="#FFF"
      />
      <Pressable style = {styles.button} onPress={() => navigation.navigate('home')}>
        <Text style = {styles.text}>Log In</Text>
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
    backgroundColor: '#F5FCFF',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'cover'
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  textInput : {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
    borderRadius: 5
  },
  button: {
    width: 200,
    backgroundColor: "steelblue",
    borderRadius: 10,
    margin: 10
  }
});
