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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: mainThemeColor }}
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
              iconName = 'home-outline';
              break;
            case 'Expense Tracker':
              iconName = 'calculator-outline';
              break;
            case 'Deals':
              iconName = 'pricetag-outline';
              break;
            case 'Investments':
              iconName = 'trending-up-outline';
              break;
            case 'Bills':
              iconName = 'cash-outline';
              break;
            case 'Insights':
              iconName = 'stats-chart-outline';
              break;
            default:
              iconName = 'menu-outline';
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
          position: 'absolute',
          backgroundColor: mainThemeColor,
          height: 60,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          } else if (route.name === 'Account') {
            iconName = 'person-outline';
          } else if (route.name === 'Friends') {
            iconName = 'people-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    ><Tab.Screen name="Home" component={Home} /><Tab.Screen name="Settings" component={Settings} /><Tab.Screen name="Account" component={Account} /><Tab.Screen name="Friends" component={Friends} /></Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: mainThemeColor,
          width: 250,
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        headerStyle: {
          backgroundColor: mainThemeColor,
          height: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
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
          backgroundColor: mainThemeColor,
          flex: 1,
        },
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
    flex: 1,
  },
  drawerItem: {
    backgroundColor: drawerItemBgColor,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  drawerItemActive: {
    backgroundColor: mainThemeColor,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemIcon: {
    marginRight: 10,
  },
  drawerItemText: {
    color: '#fff',
    fontSize: 16,
  },
  drawerItemTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});