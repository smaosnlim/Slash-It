
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const functions = getFunctions();
const Deals = ({ navigation }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDeals = useMemo(() => httpsCallable(functions, 'getDeals'), []);

  useEffect(() => {
    const fetchDeals = async () => {
      if (deals.length === 0 && !loading) {
        setLoading(true);
        try {
          const result = await getDeals();
          setDeals(result.data.deals || []);
          console.log("Deals fetched successfully:", result.data);
        } catch (error) {
          console.error("Error fetching deals:", error);
          setError("Failed to load deals. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDeals();


  }, [deals.length, getDeals, loading]);


  const renderDeal = ({ item }) => (
    <Pressable
      style={styles.dealContainer}
      onPress={() => Linking.openURL(item.link).catch(err => console.error('Error opening URL:', err))}
    >
      {item.image ? (

        <Image
          source={{ uri: item.image }}
          style={styles.dealImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.dealContent}>
        <Text style={styles.dealTitle}>{item.title}</Text>
        <Text style={styles.dealSummary} numberOfLines={3}>

          {item.summary}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.outerContainer}>

      <View style={styles.container}>
        <Text style={styles.title}>Hot Deals</Text>
        {loading && <Text style={styles.loadingText}>Loading deals...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <FlatList
          data={deals}
          renderItem={renderDeal}
          keyExtractor={(item, index) => `deal-${index}`}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            !loading && (
              <Text style={styles.emptyText}>
                No deals available at the moment
              </Text>
            )
          )}
        />
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1A1A2E',

  },
  container: {
    flex: 1,
    padding: 16,

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  dealContainer: {
    flexDirection: 'row',
    backgroundColor: '#0c299eff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  dealImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    backgroundColor: '#2C2C2C',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  dealContent: {
    flex: 1,
    padding: 12
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  dealSummary: {
    fontSize: 14,
    color: '#BBBBBB',
    lineHeight: 20,
  },
  dealImage: {
    width: 100,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0288D1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingBottom: 16,
    
  },
  loadingText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  errorText: {
    color: '#FF5252',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  emptyText: {
    color: '#BBBBBB',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default Deals;