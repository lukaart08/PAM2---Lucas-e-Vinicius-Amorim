import { useState } from "react";
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const OPCOES = [
  { chave: 'pedra', emoji: '✊', label: 'PEDRA' },
  { chave: 'papel', emoji: '✋', label: 'PAPEL' },
  { chave: 'tesoura', emoji: '✌️', label: 'TESOURA' },
];

function decidirVencedor(jogador, maquina) {
  if (jogador === maquina) return 'empate';

  const vence = {
    pedra: 'tesoura',
    papel: 'pedra',
    tesoura: 'papel',
  };

  return vence[jogador] === maquina ? 'jogador' : 'maquina';
}

export default function PedraPapelTesoura({ route, navigation }) {
  const { nome } = route.params ?? { nome: 'JOGADOR' };

  const [escolhaJogador, setEscolhaJogador] = useState(null);
  const [escolhaMaquina, setEscolhaMaquina] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [placar, setPlacar] = useState({ jogador: 0, maquina: 0, empate: 0 });

  function jogar(chaveEscolhida) {
    const sorteioMaquina = OPCOES[Math.floor(Math.random() * OPCOES.length)].chave;
    const vencedor = decidirVencedor(chaveEscolhida, sorteioMaquina);

    setEscolhaJogador(chaveEscolhida);
    setEscolhaMaquina(sorteioMaquina);
    setResultado(vencedor);

    setPlacar((atual) => ({
      ...atual,
      [vencedor]: atual[vencedor] + 1,
    }));
  }

  function jogarNovamente() {
    setEscolhaJogador(null);
    setEscolhaMaquina(null);
    setResultado(null);
  }

  function textoResultado() {
    if (resultado === 'empate') return 'EMPATOU LIXO KKK';
    if (resultado === 'jogador') return 'FINALMENTE GANHOU ALGO';
    if (resultado === 'maquina') return 'LIXOOOOOOOO';
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.tvFrame}>

        <View style={styles.barraTopo}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.botaoVoltarTexto}>{'< HOME'}</Text>
          </TouchableOpacity>
          <Text style={styles.relogio}>{nome.toUpperCase()}</Text>
        </View>

        <Text style={styles.titulo}>PEDRA · PAPEL · TESOURA</Text>

        <View style={styles.placarWrap}>
          <View style={styles.placarItem}>
            <Text style={styles.placarLabel}>VOCÊ</Text>
            <Text style={styles.placarNumero}>{placar.jogador}</Text>
          </View>
          <View style={styles.placarItem}>
            <Text style={styles.placarLabel}>EMPATES</Text>
            <Text style={styles.placarNumero}>{placar.empate}</Text>
          </View>
          <View style={styles.placarItem}>
            <Text style={styles.placarLabel}>CPU</Text>
            <Text style={styles.placarNumero}>{placar.maquina}</Text>
          </View>
        </View>

        <View style={styles.arena}>
          <View style={styles.arenaLado}>
            <Text style={styles.arenaLabel}>VOCÊ</Text>
            <View style={styles.molduraEmoji}>
              <Text style={styles.emoji}>
                {escolhaJogador ? OPCOES.find(o => o.chave === escolhaJogador).emoji : '❓'}
              </Text>
            </View>
          </View>

          <Text style={styles.vs}>VS</Text>

          <View style={styles.arenaLado}>
            <Text style={styles.arenaLabel}>CPU</Text>
            <View style={styles.molduraEmoji}>
              <Text style={styles.emoji}>
                {escolhaMaquina ? OPCOES.find(o => o.chave === escolhaMaquina).emoji : '❓'}
              </Text>
            </View>
          </View>
        </View>

        {resultado ? (
          <Text
            style={[
              styles.resultadoTexto,
              resultado === 'jogador' && styles.resultadoVitoria,
              resultado === 'maquina' && styles.resultadoDerrota,
            ]}
          >
            {textoResultado()}
          </Text>
        ) : (
          <Text style={styles.rodape}>ESCOLHA SUA JOGADA</Text>
        )}

        <View style={styles.separador} />

        <View style={styles.linhaBotoes}>
          {OPCOES.map((opcao) => (
            <View key={opcao.chave} style={styles.botaoFlex}>
              <TouchableOpacity
                style={styles.botaoInterno}
                onPress={() => jogar(opcao.chave)}
              >
                <Text style={styles.emojiBotao}>{opcao.emoji}</Text>
                <Text style={styles.botaoTexto}>{opcao.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {resultado && (
          <View style={styles.reiniciarWrap}>
            <TouchableOpacity style={styles.botaoInterno} onPress={jogarNovamente}>
              <Text style={styles.botaoTexto}>JOGAR NOVAMENTE</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.rodapeFinal}>PRESS START</Text>
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
    marginBottom: 14,
  },
  botaoVoltar: {
    borderWidth: 1,
    borderColor: '#ff3d6e',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  botaoVoltarTexto: {
    color: '#ff3d6e',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  relogio: {
    color: '#5ad1ff',
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#5ad1ff',
    letterSpacing: 1,
    marginBottom: 16,
    textAlign: 'center',
  },
  placarWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  placarItem: {
    alignItems: 'center',
    flex: 1,
  },
  placarLabel: {
    color: '#3a6a94',
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 4,
  },
  placarNumero: {
    color: '#5ad1ff',
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: '700',
  },
  arena: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 14,
  },
  arenaLado: {
    alignItems: 'center',
    flex: 1,
  },
  arenaLabel: {
    color: '#3a6a94',
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 8,
  },
  molduraEmoji: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#03101f',
    borderWidth: 2,
    borderColor: '#1c4e77',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 38,
  },
  vs: {
    color: '#ff3d6e',
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: 14,
    marginHorizontal: 4,
  },
  resultadoTexto: {
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1,
    color: '#5ad1ff',
    marginBottom: 4,
  },
  resultadoVitoria: {
    color: '#00e5ff',
  },
  resultadoDerrota: {
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
    marginBottom: 14,
  },
  botaoFlex: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 8,
  },
  botaoInterno: {
    backgroundColor: '#03101f',
    borderWidth: 1,
    borderColor: '#00e5ff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBotao: {
    fontSize: 20,
    marginBottom: 4,
  },
  botaoTexto: {
    color: '#5ad1ff',
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 1,
    textAlign: 'center',
  },
  reiniciarWrap: {
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 14,
  },
  rodape: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#3a6a94',
    letterSpacing: 1,
    marginBottom: 4,
  },
  rodapeFinal: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#3a6a94',
    letterSpacing: 1,
  },
});