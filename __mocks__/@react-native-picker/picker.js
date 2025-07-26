// __mocks__/@react-native-picker/picker.js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Picker = ({ selectedValue, onValueChange, style, children }) => (
  <View style={style}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, {
        onPress: () => onValueChange(child.props.value),
      })
    )}
  </View>
);

const PickerItem = ({ label, value, onPress }) => (
  <TouchableOpacity testID={`picker-item-${value}`} onPress={onPress}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

Picker.Item = PickerItem;

export { Picker };
