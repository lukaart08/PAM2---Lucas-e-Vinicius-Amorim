import { useState } from "react";
import { StyleSheet, ScrollView, Image, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [nomeDigitado, setNomeDigitado] = useState("");
  const [nome, setNome] = useState("Nenhum");

  const [comidasDadas, setComidasDadas] = useState(0);
  const [comidasNegadas, setComidasNegadas] = useState(0);
  const [imagem, setImagem] = useState(require('./img/check.png'));

  function confirmarNome() {
    if (nomeDigitado.trim() !== "") {
      setNome(nomeDigitado);
    }
  }

  function darComida() {
    const novoTotal = comidasDadas + 1;
    setComidasDadas(novoTotal);

    if (novoTotal > 5) {
      setImagem(require('./img/muita_comida.png'));
    } else if (novoTotal === 1) {
      setImagem(require('./img/comeu.png'));
    }
  }

  function naoDarComida() {
    const novoTotal = comidasNegadas + 1;
    setComidasNegadas(novoTotal);

    if (novoTotal > 5) {
      setImagem(require('./img/faminto.png'));
    } else if (novoTotal === 1) {
      setImagem(require('./img/triste.png'));
    }
  }

  function reiniciar() {
    setNome("Nenhum");
    setNomeDigitado("");
    setComidasDadas(0);
    setComidasNegadas(0);
    setImagem(require('./img/check.png'));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={imagem} style={styles.imagem} />

      <TextInput
        placeholder="Digite seu nome"
        value={nomeDigitado}
        onChangeText={setNomeDigitado}
        style={styles.input}
      />

      <Button title="Confirmar nome" onPress={confirmarNome} />

      <Text style={styles.texto}>O nome dele é: {nome}</Text>

      <Button title="Dar comida" onPress={darComida} />
      <Button title="Não dar comida" onPress={naoDarComida} color="#cc3333" />

      <Text style={styles.texto}>Comidas dadas: {comidasDadas}</Text>
      <Text style={styles.texto}>Comidas negadas: {comidasNegadas}</Text>

      <Button title="Reiniciar Tamagochi" onPress={reiniciar} color="#888" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  texto: {
    marginTop: 8,
    fontSize: 16,
  },
});