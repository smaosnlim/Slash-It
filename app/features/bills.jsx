import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';
import { Calendar } from 'react-native-calendars';




export default function Bills({navigation}) {

    const [events, setEvents] = useState({});
    const [eventText, setEventText] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    
    const addEvent = () => {
        //console.log("Add new Event");
        const newEvents = {...events, [selectedDate]: [
            ...(events[selectedDate] || []),
            {id: Date.now().toString(), name: eventText, time: new Date().toLocaleTimeString()},
        ],
        }
        setEvents(newEvents);
        setEventText('');
        console.log("Events: ", newEvents);
    }

    return (
        <SafeAreaView style = {styles.outerContainer}>
            <View style = {styles.container}>
            <Calendar
                onDayPress={day => {
                    setSelectedDate(day.dateString);
                }}
                markedDates = {{
                    [selectedDate]: {selected: true, selectedColor: 'lightblue'}
                }}
                style = {styles.calendar}
            />
            {events[selectedDate]?.map((event, index) => {
                <View key={index}>
                    <Text>{event.name} at {event.time}</Text>
                </View>
            })}
            <Text style = {styles.text}>Add New Event</Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Event Name"
                placeholderTextColor={'white'}
                value = {eventText}
                onChangeText = {text => setEventText(text)}
            />
            <Text style = {styles.textInput}>{selectedDate}</Text>    
            <TouchableOpacity
                onPress = {addEvent}
                style = {styles.button}
            >
                <Text>Add Event</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#1A1A2E',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A2E'
    },
    event: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        margin: 10
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 20
    },
    textInput: {
        color: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        width: 100,
        backgroundColor: "cyan",
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        margin: 10
    },
    calendar: {
        width: 350,
        height: 350,
        borderRadius: 10
    }


    }
);

/*

<Header />
            <View style = {styles.container}>
                <Text> Track your upcoming bills and manage them!</Text>
                <Pressable style = {styles.button} onPress = {() => navigation.navigate('Home')}>
                    <Text>Home</Text>
                </Pressable>
            </View>
*/