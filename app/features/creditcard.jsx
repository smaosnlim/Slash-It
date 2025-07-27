import { useState } from 'react';
import { FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Static data based on MoneySmart.sg
const creditCardData = [
  {
    id: '1',
    name: 'Citi PremierMiles Card',
    rewardType: 'Miles',
    benefits: [
      'S$1 = 1.2 miles on local spend',
      'S$1 = Up to 2.2 miles on foreign currency spend',
      'S$1 = Up to 10 miles on selected online hotel bookings',
    ],
    promotion: 'Up to 30,960 miles with $800 spend in first 2 months (T&Cs apply)',
    applyUrl: 'https://www.moneysmart.sg/credit-cards/citi-premiermiles-card',
  },
  {
    id: '2',
    name: 'HSBC Revolution Credit Card',
    rewardType: 'Reward Points',
    benefits: [
      'S$1 = 10X Points on online & contactless spend (travel, shopping, dining)',
      'S$1 = 1X Point on all other spend',
      '10 Points = 4 Miles',
    ],
    promotion: 'Instant activation, up to 4 miles per S$1 (T&Cs apply)',
    applyUrl: 'https://www.moneysmart.sg/credit-cards/hsbc-revolution-credit-card',
  },
  {
    id: '3',
    name: 'Standard Chartered Simply Cash Credit Card',
    rewardType: 'Cashback',
    benefits: [
      '2% cashback with min. spend of S$800/month',
      '1.5% cashback with no min. spend',
      'Unlimited cashback on eligible spend',
    ],
    promotion: 'Up to S$180 cash + 5GB Eskimo eSIM with $800 spend in 60 days (T&Cs apply)',
    applyUrl: 'https://www.moneysmart.sg/credit-cards/standard-chartered-simply-cash-credit-card',
  },
  {
    id: '4',
    name: 'UOB One Card',
    rewardType: 'Cashback',
    benefits: [
      'Up to 10% cashback on McDonald\'s, Grab, SimplyGo & Shopee',
      'Up to 8% cashback on grocery spend',
      'Up to S$2,240 cashback cap per year',
    ],
    promotion: 'S$60 cash with $500 spend in 30 days, chance to win S$6,000 (T&Cs apply)',
    applyUrl: 'https://www.moneysmart.sg/credit-cards/uob-one-card',
  },
  {
    id: '5',
    name: 'American Express Singapore Airlines KrisFlyer Ascend',
    rewardType: 'Miles',
    benefits: [
      'S$1 = 2 KrisFlyer miles on Singapore Airlines, Scoot, KrisShop',
      'S$1 = Up to 2 KrisFlyer miles on Grab Singapore',
      'S$1 = 1.2 KrisFlyer miles on other eligible purchases',
    ],
    promotion: 'Up to 40,000 KrisFlyer miles for new members with $1,000 spend (T&Cs apply)',
    applyUrl: 'https://www.moneysmart.sg/credit-cards/american-express-singapore-airlines-krisflyer-ascend-credit-card',
  },
];

// Categories for filtering
const categories = ['All', 'Cashback', 'Miles', 'Reward Points'];

export default function CreditCard() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter cards based on selected category
  const filteredCards = selectedCategory === 'All'
    ? creditCardData
    : creditCardData.filter(card => card.rewardType === selectedCategory);

  const handleApplyPress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error('Cannot open URL:', url);
      }
    } catch (err) {
      console.error('Error opening URL:', err);
    }
  };

  const renderCategory = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.categoryButton,
        selectedCategory === item ? styles.categoryButtonSelected : null,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item ? styles.categoryTextSelected : null,
      ]}>
        {item}
      </Text>
    </Pressable>
  );

  const renderCard = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => handleApplyPress(item.applyUrl)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.rewardType}>{item.rewardType}</Text>
      </View>
      <View style={styles.benefitsContainer}>
        {item.benefits.map((benefit, index) => (
          <Text key={index} style={styles.benefitText}>• {benefit}</Text>
        ))}
      </View>
      <Text style={styles.promotionText}>{item.promotion}</Text>
      <Text style={styles.applyText}>Apply Now</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Best Credit Cards</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        style={styles.categoryContainer}
      />
      <FlatList
        data={filteredCards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
    marginLeft: 10,
  },
  categoryContainer: {
    marginBottom: 10,
    paddingBottom: 15,
  },
  categoryList: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    height: 40, // Fixed height for buttons
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2C3E50',
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#00CCCC'
  },
  categoryText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#0D1B2A',
    fontWeight: '700',
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1B263B',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#415A77',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  rewardType: {
    fontSize: 14,
    color: '#00CCCC',
    fontWeight: '500',
  },
  benefitsContainer: {
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  promotionText: {
    fontSize: 14,
    color: '#FFD700',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  applyText: {
    fontSize: 16,
    color: '#00CCCC',
    fontWeight: '600',
    textAlign: 'right',
  },
});