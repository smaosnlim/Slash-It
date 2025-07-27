//import { LinearGradient } from 'expo-linear-gradient';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { app } from '../../backend/firebase';

const colors = ['#ff4f33', '#ffdd33', '#28f144', '#76e2f1', '#504df9', '#ad4df9', '#f94dc7']
const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
};

export default function Account({ navigation }) {

  const [data, setData] = useState(null);
  const [pieData, setPieData] = useState([])

  const handleLogout = async () => {
    try {
      await signOut(getAuth(app));
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Account</Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.sectionText}>Equity Growth</Text>
              {data ? <PieChart
                data = {pieData}
                  width = {Dimensions.get('window').width - 50}
                  height = {220}
                  chartConfig={chartConfig}
                  accessor="value"
                  backgroundColor='transparent'
                  paddingLeft='15'
                  absolute
              /> : <Text> No Chart Available </Text>}
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartText}>Savings Growth Chart</Text>
                <Text style={styles.chartText}>📈 +5% this month</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionText}>Leaderboard</Text>
              <View style={styles.leaderboardItem}>
                <Text style={styles.leaderboardText}>1. UserA - $10,000</Text>
              </View>
              <View style={styles.leaderboardItem}>
                <Text style={styles.leaderboardText}>2. UserB - $9,500</Text>
              </View>
              <View style={styles.leaderboardItem}>
                <Text style={styles.leaderboardText}>3. You - $8,000</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionText}>Net Worth Overview</Text>
              <View style={styles.netWorthItem}>
                <Text style={styles.netWorthLabel}>Assets:</Text>
                <Text style={styles.netWorthValue}>$15,000</Text>
              </View>
              <View style={styles.netWorthItem}>
                <Text style={styles.netWorthLabel}>Liabilities:</Text>
                <Text style={styles.netWorthValue}>$5,000</Text>
              </View>
              <View style={styles.netWorthItem}>
                <Text style={styles.netWorthLabel}>Net Worth:</Text>
                <Text style={styles.netWorthValue}>$10,000</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.sectionText}>Recent Achievements</Text>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementText}>🏆 Saved $1,000 this month</Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementText}>🎉 Paid off $500 debt</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 150,
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
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
    maxWidth: 400,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgb(26, 26, 46)',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  sectionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  chartText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
  leaderboardItem: {
    width: '100%',
    marginBottom: 5,
  },
  leaderboardText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  netWorthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  netWorthLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  netWorthValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  achievementItem: {
    width: '100%',
    marginBottom: 5,
  },
  achievementText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    margin: 10,
  },
  button: {
    width: 160,
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: 5,
    minHeight: 50,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});