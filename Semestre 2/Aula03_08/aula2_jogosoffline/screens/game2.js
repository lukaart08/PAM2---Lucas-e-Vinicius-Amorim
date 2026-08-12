import { useState } from "react";
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const LINHAS_VENCEDORAS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
  [0, 4, 8], [2, 4, 6],            // diagonais
];

export default function JogoDaVelha({ navigation }) {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [vezDoX, setVezDoX] = useState(true);

  const vencedor = calcularVencedor(tabuleiro);
  const empate = !vencedor && tabuleiro.every((c) => c !== null);

  function calcularVencedor(t) {
    for (const [a, b, c] of LINHAS_VENCEDORAS) {
      if (t[a] && t[a] === t[b] && t[a] === t[c]) {
        return t[a];
      }
    }
    return null;
  }

  function jogar(indice) {
    if (tabuleiro[indice] || vencedor) return;
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = vezDoX ? 'X' : 'O';
    setTabuleiro(novoTabuleiro);
    setVezDoX(!vezDoX);
  }

  function reiniciar() {
    setTabuleiro(Array(9).fill(null));
    setVezDoX(true);
  }

  let status;
  if (vencedor) status = `> ${vencedor} VENCEU!_`;
  else if (empate) status = '> EMPATE!_';
  else status = `> VEZ DE ${vezDoX ? 'X' : 'O'}_`;

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.tvFrame}>

        <View style={styles.barraTopo}>
          <View style={styles.recWrap}>
            <View style={styles.recBolinha} />
            <Text style={styles.recTexto}>REC</Text>
          </View>
          <Text style={styles.relogio}>JOGO DA VELHA</Text>
        </View>

        <Text style={styles.titulo}>JOGO DA VELHA</Text>

        <Text style={styles.status}>{status}</Text>

        <View style={styles.tabuleiro}>
          {tabuleiro.map((celula, indice) => (
            <TouchableOpacity
              key={indice}
              style={styles.celula}
              onPress={() => jogar(indice)}
            >
              <Text
                style={[
                  styles.celulaTexto,
                  celula === 'X' && styles.corX,
                  celula === 'O' && styles.corO,
                ]}
              >
                {celula}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.separador} />

        <View style={styles.linhaBotoes}>
          <View style={styles.botaoFlex}>
            <TouchableOpacity style={styles.botaoInterno} onPress={reiniciar}>
              <Text style={styles.botaoTexto}>REINICIAR</Text>
            </TouchableOpacity>
          </View>
          {navigation && (
            <View style={styles.botaoFlex}>
              <TouchableOpacity
                style={styles.botaoInterno}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.botaoTexto}>VOLTAR</Text>
              </TouchableOpacity>
            </View>
          )}
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
    marginBottom: 10,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#5ad1ff',
    letterSpacing: 1,
    marginBottom: 16,
  },
  tabuleiro: {
    width: 276,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  celula: {
    width: 84,
    height: 84,
    margin: 4,
    backgroundColor: '#03101f',
    borderWidth: 2,
    borderColor: '#1c4e77',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celulaTexto: {
    fontSize: 32,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#5ad1ff',
  },
  corX: {
    color: '#00e5ff',
  },
  corO: {
    color: '#ff3d6e',
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
  },
  botaoFlex: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 10,
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