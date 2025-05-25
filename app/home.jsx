import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Pressable style={styles.sidebarButton} onPress={() => router.push('/login')}>
            <Text style={styles.sidebarButtonText}>Login</Text>
          </Pressable>
          <Pressable style={styles.sidebarButton} onPress={() => router.push('/home')}>
            <Text style={styles.sidebarButtonText}>Home</Text>
          </Pressable>
          <Pressable style={styles.sidebarButton} onPress={() => router.push('/settings')}>
            <Text style={styles.sidebarButtonText}>Settings</Text>
          </Pressable>
        </View>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Home</Text>
            <Pressable style={styles.button} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1A1A2E',
  },
  sidebar: {
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarButton: {
    backgroundColor: '#00D4FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  sidebarButtonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: 120,
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
});