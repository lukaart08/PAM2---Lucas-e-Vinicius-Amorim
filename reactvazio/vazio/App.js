import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';

export default function App() {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text>Coloque seu nome</Text>
      <StatusBar style="auto" />
    </View>
    <TextInput
      style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Nome"
    />
    <Image
          source={{
            uri: 'https://media.tenor.com/RKDWKVSUihYAAAAj/suspicious-emoji.gif',
          }}
          style={{width: 200, height: 200}}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
