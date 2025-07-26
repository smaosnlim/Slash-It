import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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

    const [topics, setTopics] = useState("");

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

    return (
        <SafeAreaView style = {styles.outerContainer}>
            <View style = {styles.container}>
                <Text> See how you can grow your wealth!</Text>
                <Text>Investments</Text>
                <Pressable style = {styles.button} onPress = {() => navigation.navigate('Home')}>
                    <Text>Home</Text>
                </Pressable>
                <Pressable style = {styles.button} onPress = {() => getTopicsString(topicList)}>
                    <Text>Get Topics</Text>
                </Pressable>
                <Pressable style = {styles.button} onPress = {() => getApiUrl(topics)}>
                    <Text>Get News Link</Text>
                </Pressable>
                <Pressable style = {styles.button} onPress = {() => getNewsSentimentData()}>
                    <Text>Get News</Text>
                </Pressable>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A2E',
    },
    button: {
        width: 100,
        backgroundColor: "cyan",
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        margin: 10
    }

    }
);