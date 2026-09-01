import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

export default function NomeInput({ value, onChangeText, onClear }) {
  return (
    <View style={styles.linhaInput}>
      <TextInput
        style={styles.input}
        placeholder="Juca"
        placeholderTextColor="#1c4e77"
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.botaoPequeno}>
        <TouchableOpacity style={styles.botaoInterno} onPress={onClear}>
          <Text style={styles.botaoTexto}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linhaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1c4e77',
    backgroundColor: '#03101f',
    color: '#5ad1ff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  botaoPequeno: {
    borderRadius: 6,
    overflow: 'hidden',
    marginLeft: 8,
  },
  botaoInterno: {
    backgroundColor: '#03101f',
    borderWidth: 1,
    borderColor: '#00e5ff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#5ad1ff',
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
  },
});