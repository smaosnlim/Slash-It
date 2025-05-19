
import { createStackNavigator } from '@react-navigation/stack';

import Home from './home.jsx';
import Login from './login.jsx';

const handlePress = () => {
  console.log("Welcome, Logged In");
}

const Stack = createStackNavigator();
  
function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  ); 
}

export default function Navigation() {
  return (
      <RootStack />    
  )
}

/*
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
  text: {
    color: "#FFF",
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textInput : {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
  },
  button: {
    width: 200,
    backgroundColor: "steelblue"
  }
});
*/


/*
const Cat = () => {
  const name = 'Cat';
  return <Text>Hello, I am a {name}!</Text>;
};

export default Cat;
*/