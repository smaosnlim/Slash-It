// components/Sidebar.jsx
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Home', route: 'Home' },
    { name: 'Budget', route: 'Budget' },
    { name: 'Subscriptions', route: 'Subscriptions' },
    { name: 'Savings', route: 'Savings' },
  ];

  return (
    <SafeAreaView style={[styles.container, { left: isOpen ? 0 : -250 }]}>
      <LinearGradient
        colors={['#1E1E2F', '#2A2A4A']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Slash-It</Text>
        </View>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate(item.route);
              toggleSidebar();
            }}
          >
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  headerText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.1)',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  closeText: {
    color: '#1E1E2F',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Sidebar;