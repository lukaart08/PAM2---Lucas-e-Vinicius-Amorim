import { useState } from "react";
import { StyleSheet, ScrollView, Image, Text, TextInput, Button, View } from 'react-native';

// Imagens embutidas em base64 -- funcionam sem internet
const IMAGENS = {
  euforico: { uri: "data:image/png;base64,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" },
  feliz: { uri: "data:image/png;base64,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" },
  neutro: { uri: "data:image/png;base64,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" },
  triste: { uri: "data:image/png;base64,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" },
  faminto: { uri: "data:image/png;base64,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" },
};

// Escolhe a imagem com base no "humor" = comidas dadas - comidas negadas
function calcularImagem(humor) {
  if (humor >= 5) return IMAGENS.euforico;
  if (humor >= 2) return IMAGENS.feliz;
  if (humor >= -1) return IMAGENS.neutro;
  if (humor >= -4) return IMAGENS.triste;
  return IMAGENS.faminto;
}

export default function App() {
  const [nomeDigitado, setNomeDigitado] = useState("");
  const [nome, setNome] = useState("SEM SINAL");

  const [comidasDadas, setComidasDadas] = useState(0);
  const [comidasNegadas, setComidasNegadas] = useState(0);

  const humor = comidasDadas - comidasNegadas;
  const imagem = calcularImagem(humor);

  function confirmarNome() {
    if (nomeDigitado.trim() !== "") {
      setNome(nomeDigitado.toUpperCase());
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
    setNome("SEM SINAL");
    setNomeDigitado("");
    setComidasDadas(0);
    setComidasNegadas(0);
  }

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.tvFrame}>

        <View style={styles.barraTopo}>
          <View style={styles.recWrap}>
            <View style={styles.recBolinha} />
            <Text style={styles.recTexto}>REC</Text>
          </View>
          <Text style={styles.relogio}>00:12:47</Text>
        </View>

        <Text style={styles.titulo}>▓▒░ O BIXO ░▒▓</Text>

        <View style={styles.molduraImagem}>
          <Image source={imagem} style={styles.imagem} />
          <View style={styles.linhaScan1} />
          <View style={styles.linhaScan2} />
        </View>

        <Text style={styles.nomeAtual}>▶ {nome}</Text>

        <View style={styles.linhaInput}>
          <TextInput
            placeholder="DIGITE O NOME"
            placeholderTextColor="#4a7fb5"
            value={nomeDigitado}
            onChangeText={setNomeDigitado}
            style={styles.input}
          />
          <View style={styles.botaoPequeno}>
            <Button title="OK" onPress={confirmarNome} color="#077e8b" />
          </View>
        </View>

        <View style={styles.separador} />

        <View style={styles.linhaBotoes}>
          <View style={styles.botaoFlex}>
            <Button title="DAR COMIDA" onPress={darComida} color="#077e8b" />
          </View>
          <View style={styles.botaoFlexUltimo}>
            <Button title="NEGAR COMIDA" onPress={naoDarComida} color="#ff3d6e" />
          </View>
        </View>

        <View style={styles.badges}>
          <View style={[styles.badge, styles.badgeAzul]}>
            <Text style={styles.badgeTexto}>DADAS: {comidasDadas}</Text>
          </View>
          <View style={[styles.badge, styles.badgeRosa]}>
            <Text style={styles.badgeTexto}>NEGADAS: {comidasNegadas}</Text>
          </View>
        </View>

        <View style={styles.reiniciarWrap}>
          <Button title="REINICIAR" onPress={reiniciar} color="#8899bb" />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flexGrow: 1,
    backgroundColor: '#05070f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  tvFrame: {
    backgroundColor: '#0a1230',
    borderRadius: 14,
    padding: 22,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00e5ff',
    shadowColor: '#00e5ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  barraTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  recWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recBolinha: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff3d6e',
    marginRight: 6,
  },
  recTexto: {
    color: '#ff3d6e',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  relogio: {
    color: '#5ad1ff',
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#5ad1ff',
    letterSpacing: 2,
    marginBottom: 16,
    textAlign: 'center',
  },
  molduraImagem: {
    width: 180,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#03101f',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#1c4e77',
    marginBottom: 14,
    position: 'relative',
  },
  imagem: {
    width: 180,
    height: 180,
  },
  linhaScan1: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,229,255,0.25)',
  },
  linhaScan2: {
    position: 'absolute',
    top: '68%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0,229,255,0.25)',
  },
  nomeAtual: {
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#5ad1ff',
    letterSpacing: 1,
    marginBottom: 18,
  },
  linhaInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
  separador: {
    height: 1,
    backgroundColor: '#1c4e77',
    width: '100%',
    marginVertical: 16,
  },
  linhaBotoes: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  botaoFlex: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 10,
  },
  botaoFlexUltimo: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  badges: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
  },
  badgeAzul: {
    backgroundColor: '#03101f',
    borderColor: '#00e5ff',
  },
  badgeRosa: {
    backgroundColor: '#03101f',
    borderColor: '#ff3d6e',
  },
  badgeTexto: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#5ad1ff',
    letterSpacing: 1,
  },
  reiniciarWrap: {
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 14,
  },
  rodape: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#3a6a94',
    letterSpacing: 1,
  },
});