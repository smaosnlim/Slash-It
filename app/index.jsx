import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tinycolor from 'tinycolor2';

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

// Define main theme color
const mainThemeColor = '#1a1a2e'; // Navy blue as specified
const drawerItemBgColor = tinycolor(mainThemeColor).setAlpha(0.8).toRgbString(); // 80% opacity for drawer item boxes

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: mainThemeColor }} // Set background for the scroll view
    >
      <View style={[styles.drawerContainer, { backgroundColor: mainThemeColor }]}>
        {props.state.routes.map((route, index) => {
          const isFocused = props.state.index === index;
          const onPress = () => {
            const event = props.navigation.emit({
              type: 'drawerItemPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline'; // Home icon
              break;
            case 'Expense Tracker':
              iconName = 'calculator-outline'; // Calculator icon
              break;
            case 'Deals':
              iconName = 'pricetag-outline'; // Discount icon
              break;
            case 'Investments':
              iconName = 'trending-up-outline'; // Stock chart icon
              break;
            case 'Bills':
              iconName = 'cash-outline'; // Money icon
              break;
            case 'Insights':
              iconName = 'stats-chart-outline'; // Statistics icon
              break;
            default:
              iconName = 'menu-outline'; // Fallback icon
          }

          return (
            <DrawerItem
              key={route.key}
              label={() => (
                <View style={styles.drawerItemContent}>
                  <Ionicons name={iconName} size={24} color="#fff" style={styles.drawerItemIcon} />
                  <Text style={[styles.drawerItemText, isFocused && styles.drawerItemTextActive]}>
                    {route.name}
                  </Text>
                </View>
              )}
              onPress={onPress}
              style={[styles.drawerItem, isFocused && styles.drawerItemActive]}
              focused={isFocused}
            />
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute', // Position the tab bar at the bottom
          backgroundColor: mainThemeColor, // Navy blue (no opacity)
          height: 60, // Match header height for consistency",
          borderTopWidth: 1, // Remove top border
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline'; // Home icon
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline'; // Gear icon
          } else if (route.name === 'Account') {
            iconName = 'person-outline'; // Anonymous profile icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff', // White for active tab to match drawer text
        tabBarInactiveTintColor: '#ccc', // Light gray for inactive tab
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size to match header title
          fontWeight: 'bold', // Match header title weight
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: mainThemeColor, // Navy blue (no opacity)
          width: 250,
          
        },
        drawerActiveTintColor: '#fff', // White text for active item
        drawerInactiveTintColor: '#fff', // White text for inactive items
        headerStyle: {
          backgroundColor: mainThemeColor, // Match tab bar background
          height: 0, // Match tab bar height
        },
        headerTintColor: '#fff', // White text to match active tab
        headerTitleStyle: {
          fontSize: 16, // Match drawer item text size
          fontWeight: 'bold', // Match active tab label
        },
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
        cardStyle: {
          backgroundColor: mainThemeColor, // Navy blue (no opacity)
          flex: 1, // Ensure the stack fills the screen
          
        },
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="home" component={MyDrawer} />
    </Stack.Navigator>
  );
}

export default Navigation;

const styles = StyleSheet.create({
  drawerContainer: {
    padding: 10,
    flex: 1, // Ensure the container takes up the full height
  },
  drawerItem: {
    backgroundColor: drawerItemBgColor, // Box background with 80% opacity theme color
    borderRadius: 10, // Rounded corners
    marginVertical: 5,
    padding: 10,
  },
  drawerItemActive: {
    backgroundColor: mainThemeColor, // Full opacity for active item
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemIcon: {
    marginRight: 10, // Space between icon and text
  },
  drawerItemText: {
    color: '#fff', // White text for inactive items
    fontSize: 16,
  },
  drawerItemTextActive: {
    color: '#fff', // White text for active items
    fontWeight: 'bold',
  },
});