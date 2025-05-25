import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Deals({navigation}) {
    return (
        <SafeAreaView style = {styles.outerContainer}>
            {/*<Header />*/}
            <View style = {styles.container}>
                <Text> Check out the latest deals for you!</Text>
                <Pressable style = {styles.button} onPress = {() => router.push('/home')}>
                    <Text>Home</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
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