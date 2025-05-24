import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Header({navigation}) {
    return (
        <View style = {styles.header}> 
            <Pressable>
                <Text>Home</Text>
            </Pressable>
            <Pressable>
                <Text>Expense Tracker</Text>
            </Pressable>
            <Pressable>
                <Text>Deals</Text>
            </Pressable>
            <Pressable>
                <Text>Investments</Text>
            </Pressable>
            <Pressable>
                <Text>Bills</Text>
            </Pressable>
            <Pressable>
                <Text>Log Out</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#5de0e6',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
});