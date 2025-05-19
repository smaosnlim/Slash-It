import { Pressable, StyleSheet, View } from 'react-native';

export default function Header() {
    return (
        <View style = {styles.header}> 
            <Pressable>Home</Pressable>
            <Pressable>Expense Tracker</Pressable>
            <Pressable>Deals</Pressable>
            <Pressable>Investments</Pressable>
            <Pressable>Bills</Pressable>
            <Pressable>Log Out</Pressable>
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