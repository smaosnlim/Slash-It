import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Bills from './bills.jsx';
import Deals from './deals.jsx';
import ExpenseTracker from './expensetracker.jsx';
import Home from './home.jsx';
import Investments from './investments.jsx';
import Login from './login.jsx';
import SignUp from './signup.jsx';

const handlePress = () => {
  console.log("Welcome, Logged In");
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="ExpenseTracker" component={ExpenseTracker} />
            <Drawer.Screen name="Deals" component={Deals} />
            <Drawer.Screen name="Investments" component={Investments} />
            <Drawer.Screen name="Bills" component={Bills} />
        </Drawer.Navigator>
    )
}

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions = {{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="home" component={MyDrawer} />
    </Stack.Navigator>
  )
}
