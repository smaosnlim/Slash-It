
import { MaterialIcons } from '@expo/vector-icons';
//import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = ['#ff4f33', '#ffdd33', '#28f144', '#76e2f1', '#504df9', '#ad4df9', '#f94dc7'];
const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export default function Insights({ navigation, route }) {
  const [expenseList, setExpenseList] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (route.params?.expenseList) {
      console.log('Received expense list:', route.params.expenseList);
      setExpenseList(route.params.expenseList);
    }
    if (route.params?.output) {
      console.log("Received Insights");
      console.log(route.params.output);
      setPieData(transformData(route.params.output.breakdown || {}));
      setTips(route.params.output.tips || []);
    }
  }, [route.params?.expenseList, route.params?.output]);

  const transformData = (breakdown) => {
    const result = [];
    if (breakdown && typeof breakdown === 'object' && !Array.isArray(breakdown)) {
      let colorIndex = 0;
      for (const key in breakdown) {
        if (Object.prototype.hasOwnProperty.call(breakdown, key)) {
          result.push({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: breakdown[key],
            color: colors[colorIndex % colors.length],
            legendFontColor: '#FFFFFF',
            legendFontSize: 14,
          });
          colorIndex++;
        }
      }
    }
    return result;
  };

  const handleBack = () => {
    try {
      console.log('Navigating to "Expense Tracker"');
      navigation.navigate('Expense Tracker');
    } catch (error) {
      console.error('Navigation error:', error);
      if (navigation.canGoBack()) {
        console.log('Falling back to goBack');
        navigation.goBack();
      } else {
        console.error('Cannot go back');
      }
    }
  };

  const renderExpense = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseText}>{item}</Text>
    </View>
  );

  const renderTip = ({ item }) => (
    <Text style={styles.tipText}>- {item}</Text>
  );

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Insights</Text>
          </View>
          <View style={styles.card}>
            {expenseList.length > 0 ? (
              <FlatList
                data={expenseList}
                renderItem={renderExpense}
                keyExtractor={(item, index) => index.toString()}
                style={styles.expenseList}
              />
            ) : (
              <Text style={styles.emptyText}>No expenses received.</Text>
            )}
            <View style={styles.chartContainer}>
              <PieChart
                data={pieData}
                width={Dimensions.get('window').width - 50}
                height={180}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
            <FlatList
              data={tips}
              renderItem={renderTip}
              keyExtractor={(item, index) => index.toString()}
              style={styles.tipsList}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.backButton} onPress={handleBack}>
              <MaterialIcons name="arrow-back" size={24} color="#1A1A2E" />
              <Text style={styles.buttonText}>Back</Text>
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
    paddingBottom: 100,
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
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  expenseList: {
    width: '100%',
    marginVertical: 20,
  },
  tipsList: {
    width: '100%',
    marginVertical: 20,
  },
  expenseItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    
  },
  expenseText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  tipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 5,
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
  backButton: {
    width: 160,
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    margin: 5,
    minHeight: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
