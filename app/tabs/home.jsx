import { signOut } from 'firebase/auth';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../backend/firebase';

const mainThemeColor = '#1a1a2e';
  
const Card = ({title}) => {
  return (
    <View style={styles.sectionPlaceholder}>
      <Text style={styles.sectionText}>{title}</Text>
    </View>
  );
}

const CustomButton = ({title, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

export default function Home({ navigation }) {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const cardList = ['Account Balance', 'Recent Transactions', 'Quick Actions'];
  const buttons = {
    'Deals': () => navigation.navigate('Deals'),
    'Expense Tracker': () => navigation.navigate('Expense Tracker'),
  };

  return (
    <SafeAreaView style={styles.outerContainer} >      
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Home</Text>
          </View>
          <View style={styles.card}>
            {cardList.map((title, index) => (
              <Card key={index} title={title} />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            {Object.entries(buttons).map(([title, onPress], index) => (
              <CustomButton key={index} title={title} onPress={onPress} />
            ))}
            <Pressable style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Add padding to control top spacing
    paddingBottom: 20, // Add padding to control bottom spacing
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgb(26, 26, 46)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  sectionPlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 40,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
    height: 100
  },
  sectionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    margin: 10
  },
  button: {
    width: 160, // Increased width to fit "Expense Tracker"
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    justifyContent: 'center', // Added for vertical centering
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: 5,
    minHeight: 50, // Ensures consistent height for centering
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Ensures text is horizontally centered
  },
});