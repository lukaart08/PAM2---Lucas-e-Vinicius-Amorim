import { useState } from "react";
import { StyleSheet, ScrollView, Text, TextInput, Button, View } from 'react-native';

const ESTADOS = {
  euforico: { emoji: '🤩', cor: '#c0f5c0' },
  feliz:    { emoji: '😊', cor: '#d3f5d3' },
  neutro:   { emoji: '😐', cor: '#b6e3f4' },
  triste:   { emoji: '😢', cor: '#f4d6d6' },
  faminto:  { emoji: '😭', cor: '#f7cf9e' },
};

function calcularEstado(humor) {
  if (humor >= 5) return ESTADOS.euforico;
  if (humor >= 2) return ESTADOS.feliz;
  if (humor >= -1) return ESTADOS.neutro;
  if (humor >= -4) return ESTADOS.triste;
  return ESTADOS.faminto;
}

export default function App() {
  const [nomeDigitado, setNomeDigitado] = useState("");
  const [nome, setNome] = useState("Nenhum");

  const [comidasDadas, setComidasDadas] = useState(0);
  const [comidasNegadas, setComidasNegadas] = useState(0);

  const humor = comidasDadas - comidasNegadas;
  const estado = calcularEstado(humor);

  function confirmarNome() {
    if (nomeDigitado.trim() !== "") {
      setNome(nomeDigitado);
      setNomeDigitado("");
    }
  }

  function darComida() {
    setComidasDadas(comidasDadas + 1);
  }

  function naoDarComida() {
    setComidasNegadas(comidasNegadas + 1);
  }

  function reiniciar() {
    setNome("Nenhum");
    setNomeDigitado("");
    setComidasDadas(0);
    setComidasNegadas(0);
  }

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Esse bixo ai</Text>

        <View style={[styles.molduraImagem, { backgroundColor: estado.cor }]}>
          <Text style={styles.emoji}>{estado.emoji}</Text>
        </View>

        <Text style={styles.nomeAtual}>{nome}</Text>

        <View style={styles.linhaInput}>
          <TextInput
            placeholder="Digite o nome dele"
            placeholderTextColor="#999"
            value={nomeDigitado}
            onChangeText={setNomeDigitado}
            style={styles.input}
          />
          <View style={styles.botaoPequeno}>
            <Button title="OK" onPress={confirmarNome} color="#3366cc" />
          </View>
        </View>

        <View style={styles.separador} />

        <View style={styles.linhaBotoes}>
          <View style={styles.botaoFlex}>
            <Button title="🍖 Dar comida" onPress={darComida} color="#2e9e4f" />
          </View>
          <View style={styles.botaoFlex}>
            <Button title="🚫 Negar comida" onPress={naoDarComida} color="#cc3333" />
          </View>
        </View>

        <View style={styles.badges}>
          <View style={[styles.badge, styles.badgeVerde]}>
            <Text style={styles.badgeTexto}>Dadas: {comidasDadas}</Text>
          </View>
          <View style={[styles.badge, styles.badgeVermelho]}>
            <Text style={styles.badgeTexto}>Negadas: {comidasNegadas}</Text>
          </View>
        </View>

        <View style={styles.reiniciarWrap}>
          <Button title="↺ Reiniciar Tamagochi" onPress={reiniciar} color="#888" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flexGrow: 1,
    backgroundColor: '#eef2f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2b2b3d',
    marginBottom: 16,
  },
  molduraImagem: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#f3f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#dfe6ef',
    marginBottom: 10,
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nomeAtual: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3366cc',
    marginBottom: 18,
  },
  linhaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dcdfe6',
    backgroundColor: '#fafbfc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  botaoPequeno: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  separador: {
    height: 1,
    backgroundColor: '#eef0f4',
    width: '100%',
    marginVertical: 16,
  },
  linhaBotoes: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginBottom: 16,
  },
  botaoFlex: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeVerde: {
    backgroundColor: '#e4f7e9',
  },
  badgeVermelho: {
    backgroundColor: '#fbe6e6',
  },
  badgeTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  reiniciarWrap: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
});