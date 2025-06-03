import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Insights({ navigation, route }) {
  const [expenseList, setExpenseList] = useState([]);
  const [output, setOutput] = useState(null);

  useEffect(() => {
    if (route.params?.expenseList) {
      console.log('Received expense list:', route.params.expenseList);
      setExpenseList(route.params.expenseList);
    }
    if (route.params?.output) {
      console.log("Received Insights");
      setOutput(route.params.output);
    }
  }, [route.params?.expenseList, route.params?.output]);

  const handleBack = () => {
    try {
      console.log('Navigation prop:', navigation);
      console.log('Attempting to navigate to "Expense Tracker"');
      navigation.navigate('Expense Tracker');
    } catch (error) {
      console.error('Navigation error:', error);
      if (navigation.canGoBack()) {
        console.log('Falling back to goBack');
        navigation.goBack();
      } else {
        console.error('Cannot go back, navigation stack may be empty');
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
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Insights</Text>
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
          {output ? (
            <View style={styles.insightsContainer}>
              <Text style={styles.insightTitle}>Total Spending: ${output.total}</Text>
              <Text style={styles.insightTitle}>Breakdown:</Text>
              {Object.entries(output.breakdown).map(([category, amount]) => (
                <Text key={category} style={styles.expenseText}>
                  {category}: ${amount}
                </Text>
              ))}
              <Text style={styles.insightTitle}>Tips:</Text>
              <FlatList
                data={output.tips}
                renderItem={renderTip}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <Text style={styles.emptyText}>No insights available.</Text>
          )}
        </View>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="#1A1A2E" />
        </Pressable>
      </View>
    </SafeAreaView>
  /*
  const renderExpense = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseText}>{item}</Text>
    </View>
    
  );

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Insights</Text>
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
        </View>
        <View>
          <Text style = {styles.expenseText}>{output}</Text>
        </View>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1A1A2E" />
        </Pressable>
      </View>
    </SafeAreaView>
*/
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 400,
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
  expenseList: {
    width: '100%',
  },
  expenseItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  expenseText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 48,
    height: 48,
    backgroundColor: '#00D4FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  insightsContainer: {
    width: '100%',
    marginTop: 20,
  },
  insightTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  tipText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

/*
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 400,
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
  expenseList: {
    width: '100%',
  },
  expenseItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  expenseText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 48,
    height: 48,
    backgroundColor: '#00D4FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
*/