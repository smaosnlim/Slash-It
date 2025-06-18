import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Investments({navigation}) {
    return (
        <SafeAreaView style = {styles.outerContainer}>
            <View style = {styles.container}>
                <Text> See how you can grow your wealth!</Text>
                <Pressable style = {styles.button} onPress = {() => navigation.navigate('Home')}>
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