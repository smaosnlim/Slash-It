import { Button, Text, View } from 'react-native';

export default function Home({navigation}) {
    return (
        <View>
            <Text> Welcome Home </Text>
            <Button title = "Go Back" onPress = {() => navigation.goBack()}/>
        </View>
    )
}