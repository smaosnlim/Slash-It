import { FlatList, Image, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getFunctions, httpsCallable } from 'firebase/functions';
import { useEffect, useMemo, useState } from 'react';

const functions = getFunctions();
const getDeals = useMemo(() => httpsCallable(functions, 'getDeals'), []);

export default function Deals({ navigation }) {

  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        //const getDeals = httpsCallable(functions, 'getDeals');
        const result = await getDeals();
        setDeals(result.data.deals);
        console.log("Deals fetched successfully:", result.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  const renderDeal = ({item}) => (
    <View style={styles.dealPlaceholder}>
    <TouchableOpacity
      style={styles.dealContainer}
      onPress={() => Linking.openURL(item.link)}
    >
      {item.image ? (
        <Image 
          source={{ uri: item.image }}
          style={styles.dealImage}
          resizeMode='contain'
          />
      ) : null}
      <View style={styles.dealText}>
        <Text style={styles.dealText}>{item.title}</Text>
        <Text numberOfLines={3}>
          {item.summary}
        </Text>
      </View>
    </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.outerContainer}>
    {/*<ScrollView>*/}
        <View style={styles.card}>
            <Text style={styles.title}>Deals</Text>
            
            <FlatList
              data={deals}
              renderItem={renderDeal}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.list}
            />
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
        </View>
      
      {/*</ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  dealContainer: {
    width: '100%',
  },
  dealPlaceholder: {
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
    height: 'auto', // Increased height for larger boxes
  },
  dealText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  dealImage: {
    width: 100,
    height: 70,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: 100,
    backgroundColor: '#00D4FF',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    color: '#1A1A2E',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 20,
  },
});