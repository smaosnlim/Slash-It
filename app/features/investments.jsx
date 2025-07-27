import { formatDistanceToNow, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getFunctions, httpsCallable } from 'firebase/functions';

//const isDev = process.env.NODE_ENV === 'development';
//const functions = getFunctions(undefined, isDev ? "http://127.0.0.1:5001" : undefined );
const functions = getFunctions();
const getNewsSentiment = httpsCallable(functions, 'getNewsSentiment');


const base_url = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&"
//const topicList = ["blockchain", "finance", "ipo", "financial_markets", "finance", "technology"]
const topicList = ["blockchain"]
const NEWS_API_KEY=process.env.NEWS_API_KEY

export default function Investments({navigation}) {

    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    /*
    const getTopicsString = (topics) => {
        let combinedTopics = "";
        for (let i = 0; i < topics.length; i++) {
            combinedTopics += topics[i];
            if (i != topics.length - 1) {
                combinedTopics += ",";
            }
        }
            combinedTopics = "topics=" + combinedTopics;
            console.log(combinedTopics);
            setTopics(combinedTopics);
    }
    
    const getApiUrl = (parameters) => {
        let url = `${base_url}${parameters}&apikey=${NEWS_API_KEY}`;
        console.log(url);
    }

    const getNewsSentimentData = async () => {
        const news = await getNewsSentiment()
        console.log(news["data"]["data"])
    }
    */

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const news = await getNewsSentiment();
                setNewsData(news.data.data);
            } catch (err) {
                setError('Failed to fetch news: ' + err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleCardPress = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error("Cannot open URL:", url);
            }
        } catch (err) {
            console.error("Error opening URL:", err);
        }
    };

    const renderNewsItem = ({ item }) => {
        const publishedDate = item.time_published
            ? formatDistanceToNow(
                  parse(item.time_published, 'yyyyMMdd\'T\'HHmmss', new Date()),
                  { addSuffix: true }
              )
            : 'Unknown date';

        return (
            <Pressable
                style={({ pressed }) => [
                    styles.newsCard,
                    { opacity: pressed ? 0.7 : 1 }
                ]}
                onPress={() => handleCardPress(item.url)}
            >
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSummary} numberOfLines={3}>{item.summary}</Text>
                <View style={styles.newsFooter}>
                    <View style={styles.sourceContainer}>
                        <Text style={styles.newsSource}>{item.source}</Text>
                        <Text style={styles.newsDate}>{publishedDate}</Text>
                    </View>
                    <Text style={[
                        styles.sentiment,
                        { color: item.overall_sentiment_score > 0 ? '#00cc00' : item.overall_sentiment_score < 0 ? '#ff3333' : '#cccccc' }
                    ]}>
                        {item.overall_sentiment_label}: {item.overall_sentiment_score?.toFixed(2) || 'N/A'}
                    </Text>
                </View>
                <Text style={styles.readMore}>Read More</Text>
            </Pressable>
        );
    };

    return (
        <SafeAreaView style = {styles.outerContainer}>
            <View style = {styles.container}>
                <Text style={styles.header}>Financial News</Text>

                {isLoading && <ActivityIndicator size="large" color="#00ffff" style={styles.loader} />}
                {error && <Text style={styles.errorText}>{error}</Text>}
                
                {!isLoading && !error && newsData.length > 0 && (
                    <FlatList
                        data={newsData}
                        renderItem={renderNewsItem}
                        keyExtractor={(item, index) => `${item.url}-${index}`}
                        style={styles.newsList}
                        contentContainerStyle={styles.newsListContent}
                    />
                )}
                
                {!isLoading && !error && newsData.length === 0 && (
                    <Text style={styles.noDataText}>No news available.</Text>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        outerContainer: {
            flex: 1,
            backgroundColor: '#1A1A2E'
        },
        container: {
            flex: 1,
            backgroundColor: '#1A1A2E',
        },
        button: {
            width: 100,
            backgroundColor: "cyan",
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            margin: 10
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginVertical: 20,
        },
        newsList: {
            flex: 1,
        },
        newsListContent: {
            paddingHorizontal: 16,
            paddingBottom: 20,
        },
        newsCard: {
            backgroundColor: '#2c3e50',
            borderRadius: 12,
            padding: 16,
            marginVertical: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
            borderWidth: 1,
            borderColor: '#3b4a5c',
        },
        newsTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: 8,
        },
        newsSummary: {
            fontSize: 14,
            color: '#cccccc',
            marginBottom: 12,
            lineHeight: 20,
        },
        newsFooter: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        sourceContainer: {
            flexDirection: 'column',
        },
        newsSource: {
            fontSize: 12,
            color: '#999999',
            fontStyle: 'italic',
        },
        newsDate: {
            fontSize: 12,
            color: '#999999',
            marginTop: 4,
        },
        sentiment: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        readMore: {
            fontSize: 14,
            color: '#00cccc',
            textAlign: 'right',
            fontWeight: '500',
        },
        loader: {
            marginTop: 20,
        },
        errorText: {
            color: '#ff3333',
            textAlign: 'center',
            margin: 20,
            fontSize: 16,
        },
        noDataText: {
            color: '#cccccc',
            textAlign: 'center',
            margin: 20,
            fontSize: 16,
        },
    }
);