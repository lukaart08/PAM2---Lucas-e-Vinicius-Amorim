import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AVATARES = ['🐱', '🐶', '🦊', '🐸', '🤖', '👾'];

export default function AvatarInput({ value, onChange }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.rotulo}>ESCOLHA SEU AVATAR</Text>
      <View style={styles.linha}>
        {AVATARES.map((avatar) => (
          <TouchableOpacity
            key={avatar}
            style={[
              styles.opcao,
              value === avatar && styles.opcaoSelecionada,
            ]}
            onPress={() => onChange(avatar)}
          >
            <Text style={styles.emoji}>{avatar}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: 4,
    marginBottom: 8,
  },
  rotulo: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#3a6a94',
    letterSpacing: 1,
    marginBottom: 8,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  opcao: {
    width: 42,
    height: 42,
    borderRadius: 6,
    backgroundColor: '#03101f',
    borderWidth: 1,
    borderColor: '#1c4e77',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcaoSelecionada: {
    borderColor: '#00e5ff',
    borderWidth: 2,
  },
  emoji: {
    fontSize: 22,
  },
});