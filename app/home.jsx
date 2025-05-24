import { Pressable, StyleSheet, Text, View } from 'react-native';
import Header from '../components/header';

export default function Home({navigation}) {
    return (
        <View>
        <Header />
        <View style = {styles.container}>
            <Text> Welcome Home </Text>
            <Pressable style = {styles.button} onPress = {() => navigation.goBack()}>
                <Text>Go Back</Text>
            </Pressable>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
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