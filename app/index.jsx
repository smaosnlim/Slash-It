import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './auth/login.jsx';
import SignUp from './auth/signup.jsx';
import Bills from './features/bills.jsx';
import Deals from './features/deals.jsx';
import ExpenseTracker from './features/expensetracker.jsx';
import Insights from './features/insights.jsx';
import Investments from './features/investments.jsx';
import Account from './tabs/account.jsx';
import Home from './tabs/home.jsx';
import Settings from './tabs/settings.jsx';

const handlePress = () => {
  console.log("Welcome, Logged In");
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Expense Tracker" component={ExpenseTracker} />
      <Drawer.Screen name="Deals" component={Deals} />
      <Drawer.Screen name="Investments" component={Investments} />
      <Drawer.Screen name="Bills" component={Bills} />
      <Drawer.Screen name="Insights" component={Insights} />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="home" component={MyDrawer} />
    </Stack.Navigator>
  );
}