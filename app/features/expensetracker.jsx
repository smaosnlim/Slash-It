import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import OpenAI from 'openai';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExpenseTracker({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const categories = [
    'food & drink',
    'transport',
    'utilities/bills',
    'savings',
    'investment',
    'entertainment',
    'others',
  ];

  const addExpense = () => {
    if (!expenseName || !category || !amount) {
      return; // Basic validation
    }
    const newExpense = {
      id: Date.now().toString(),
      name: expenseName,
      category: category,
      amount: parseFloat(amount).toFixed(2),
    };
    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setCategory('');
    setAmount('');
  };

  const removeExpense = (id) => {
    console.log('Removing expense with id:', id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleConfirm = async () => {
      const expenseList = expenses.map(
        (expense) => `${expense.name},${expense.category},$${expense.amount}`
      );
      /*console.log('Formatted expense list:', expenseList);
      console.log('Navigation prop:', navigation);
      console.log('Attempting to navigate to "Insights"');
      */
      if (expenseList.length === 0) {
        console.log("Please add at least 1 expense")
        return;
      }

      const grokPrompt = `Analyse this expense list and provide insights: ${JSON.stringify(expenseList)}`;

   
      try {
      const client = new OpenAI({
        apiKey: MY_API_KEY, // Replace with your actual OpenAI API key
        baseURL: 'https://api.x.ai/v1',
      });

      const completion = await client.chat.completions.create({
        model: 'grok-3-latest',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides insights on expenses.',
          },
          {
            role: 'user',
            content: grokPrompt,
          },
        ],
      });
      const output = completion.choices[0].message;
      navigation.navigate('Insights', {
        expenseList,
        output
      });

    /*
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const insights = data.choices?.[0]?.text || 'No insights generated';
    
    navigation.navigate('Insights', { expenseList, insights });
    */
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

  const handleBackToHome = () => {
    try {
      console.log('Navigation prop:', navigation);
      console.log('Attempting to navigate to "Home"');
      navigation.navigate('Home');
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

  const renderExpense = ({ item }) => {
    console.log('Rendering expense:', item);
    return (
      <View style={styles.expenseItem}>
        <Text style={styles.expenseText}>{item.name}</Text>
        <Text style={styles.expenseText}>{item.category}</Text>
        <View style={styles.expenseAmountContainer}>
          <Text style={styles.expenseText}>${item.amount}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeExpense(item.id)}
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Expense Tracker</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Expense Name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={expenseName}
              onChangeText={setExpenseName}
            />
            <Pressable
              style={styles.textInput}
              onPress={() => setShowPicker(true)}
            >
              <Text
                style={[
                  styles.inputText,
                  !category && styles.placeholderText,
                ]}
              >
                {category || 'Select a category'}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#00D4FF"
                style={styles.pickerIcon}
              />
            </Pressable>
            {showPicker && (
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => {
                  setCategory(itemValue);
                  setShowPicker(false);
                }}
                style={styles.picker}
                dropdownIconColor="#00D4FF"
              >
                <Picker.Item
                  label="Select a category"
                  value=""
                  style={styles.pickerItem}
                />
                {categories.map((cat) => (
                  <Picker.Item
                    key={cat}
                    label={cat}
                    value={cat}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
            )}
            <TextInput
              style={styles.textInput}
              placeholder="Amount"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={amount}
              onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
              returnKeyType='done'
            />
            <Pressable style={styles.addButton} onPress={addExpense}>
              <MaterialIcons name="add" size={24} color="#1A1A2E" />
            </Pressable>
          </View>
          <FlatList
            data={expenses}
            renderItem={renderExpense}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No expenses added yet.</Text>
            }
            style={styles.expenseList}
          />
        </View>
        <Pressable
          style={styles.backButton}
          onPress={handleBackToHome}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1A1A2E" />
        </Pressable>
        <Pressable
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <MaterialIcons name="check" size={24} color="#1A1A2E" />
        </Pressable>
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
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  pickerIcon: {
    marginLeft: 10,
  },
  picker: {
    width: '100%',
    color: '#FFFFFF',
    //backgroundColor: '#1A1A2E',
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  pickerItem: {
    color: '#FFFFFF',
    //backgroundColor: '#1A1A2E',
    backgroundColor: "#FFFFFF", //changed options to white for visibility
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#00D4FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  expenseList: {
    width: '100%',
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  expenseText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    paddingRight: 10,
  },
  expenseAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  removeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Debugging visibility
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
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
  confirmButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
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