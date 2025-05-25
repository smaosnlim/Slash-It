import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Redirect href="/login" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
});