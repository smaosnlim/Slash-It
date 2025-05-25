import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Bills({navigation}) {
    return (
        <SafeAreaView style = {styles.outerContainer}>
            {/*<Header />*/}
            <View style = {styles.container}>
                <Text> Track your upcoming bills and manage them!</Text>
                <Pressable style = {styles.button} onPress = {() => navigation.goBack()}>
                    <Text>Go Back</Text>
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