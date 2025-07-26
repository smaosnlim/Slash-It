import { Text, View } from 'react-native';

const MockIcon = ({ name, size, color, style }) => (
  <View testID={`icon-${name}`} style={[{ width: size, height: size }, style]}>
    <Text>{name}</Text>
  </View>
);

export const MaterialIcons = MockIcon;