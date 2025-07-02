import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tinycolor from 'tinycolor2';

import Info from './auth/info.jsx';
import Login from './auth/login.jsx';
import SignUp from './auth/signup.jsx';
import Bills from './features/bills.jsx';
import Deals from './features/deals.jsx';
import ExpenseTracker from './features/expensetracker.jsx';
import Insights from './features/insights.jsx';
import Investments from './features/investments.jsx';
import Account from './tabs/account.jsx';
import Friends from './tabs/Friends.jsx';
import Home from './tabs/home.jsx';
import Settings from './tabs/settings.jsx';

const mainThemeColor = '#1a1a2e';
const drawerItemBgColor = tinycolor(mainThemeColor).setAlpha(0.8).toRgbString();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const ICON_MAP = {
  Home: 'home-outline',
  'Expense Tracker': 'calculator-outline',
  Deals: 'pricetag-outline',
  Investments: 'trending-up-outline',
  Bills: 'cash-outline',
  Insights: 'stats-chart-outline',
  Settings: 'settings-outline',
  Account: 'person-outline',
  Friends: 'people-outline',
}

function CustomDrawerContent({ navigation, state }) {
  return (
    <DrawerContentScrollView style={{ backgroundColor: mainThemeColor }}>
      <View style={styles.drawerContainer}>
        {state.routes.map((route, index) => (
          <DrawerItem
            key={route.key}
            label={() => (
              <View style={styles.drawerItemContent}>
                <Ionicons name={ICON_MAP[route.name] || 'menu-outline'} size={24} color="#fff" style={styles.drawerItemIcon} />
                <Text style={[styles.drawerItemText, state.index === index && styles.drawerItemTextActive]}>
                  {route.name}
                </Text>
              </View>
            )}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.drawerItem, state.index === index && styles.drawerItemActive]}
            focused={state.index === index}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICON_MAP[route.name]} size={size} color={color} />
        ),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Friends" component={Friends} />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: styles.drawerStyle,
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor,
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Expense Tracker" component={ExpenseTracker} />
      <Drawer.Screen name="Deals" component={Deals} />
      <Drawer.Screen name="Investments" component={Investments} />
      <Drawer.Screen name="Bills" component={Bills} />
      <Drawer.Screen name="Insights" component={Insights} />
    </Drawer.Navigator>
  );
}

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: styles.cardStyle,
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="home" component={MyDrawer} />
    </Stack.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  drawerContainer: { 
    padding: 10, 
    flex: 1
  },
  drawerItem: { 
    backgroundColor: drawerItemBgColor, 
    borderRadius: 10, 
    marginVertical: 5, 
    padding: 10 
  },
  drawerItemActive: { 
    backgroundColor: mainThemeColor 
  },
  drawerItemContent: { 
    flexDirection: 'row', 
    alignItems: 'center',
     
  },
  drawerItemIcon: { 
    marginRight: 10, 
  },
  drawerItemText: { 
    color: '#fff', fontSize: 16
  },
  drawerItemTextActive: { 
    color: '#fff', fontWeight: 'bold' 
  },
  tabBar: { 
    position: 'absolute', 
    backgroundColor: mainThemeColor, 
    height: 60, 
    borderTopWidth: 1, 
    marginBottom: 20,
  },
  tabBarLabel: { 
    fontSize: 12,
    fontWeight: 'bold' 
  },
  drawerStyle: {
    backgroundColor: mainThemeColor,
    width: 250,
  },
  headerStyle: {
    backgroundColor: mainThemeColor,
    height: 0,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardStyle: {
    backgroundColor: mainThemeColor,
    flex: 1,
    paddingTop: 20,
    paddingLeft: 0
  },
});
