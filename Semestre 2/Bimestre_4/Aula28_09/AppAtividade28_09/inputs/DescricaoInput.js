import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function DescricaoInput({ rotulo, value, onChangeText, onReset, maxLength = 300 }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>{rotulo}</Text>
        <TouchableOpacity onPress={onReset}>
          <Text style={styles.restaurar}>Restaurar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        multiline
        maxLength={maxLength}
        textAlignVertical="top"
        placeholder="Escreva a descrição..."
        placeholderTextColor="#8a97b3"
      />
      <Text style={styles.contador}>{value.length}/{maxLength}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  rotulo: { color: '#0f2a6b', fontSize: 13, fontWeight: '700' },
  restaurar: { color: '#e63946', fontSize: 12, fontWeight: '700' },
  input: {
    minHeight: 110, backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#d5def0', borderRadius: 14,
    color: '#1b2a4a', fontSize: 14, lineHeight: 21, paddingVertical: 10, paddingHorizontal: 14,
  },
  contador: { color: '#6b7a99', fontSize: 11, textAlign: 'right', marginTop: 4 },
});