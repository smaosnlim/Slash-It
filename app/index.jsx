
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
const Cat = () => {
  const name = 'Cat';
  return <Text>Hello, I am a {name}!</Text>;
};

export default Cat;
*/