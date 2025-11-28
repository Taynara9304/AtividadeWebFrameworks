import { Platform, StyleSheet, Text, View } from 'react-native';
import Home from '../../telas/Home';

export default function HomeScreen() {
  return (
    <View>
      <Text>OIIII</Text>
      <Text>Bom dia</Text>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
