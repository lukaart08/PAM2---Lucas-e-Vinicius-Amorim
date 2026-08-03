import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [relogio, setRelogio] = useState('00:00:00');

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date();
      setRelogio(agora.toLocaleTimeString('pt-BR'));
    };
    atualizar();
    const intervalo = setInterval(atualizar, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.tvFrame}>

        <View style={styles.barraTopo}>
          <View style={styles.recWrap}>
            <View style={styles.recBolinha} />
            <Text style={styles.recTexto}>REC</Text>
          </View>
          <Text style={styles.relogio}>{relogio}</Text>
        </View>

        <Text style={styles.titulo}>JOGOS OFFLINE AAAAAAAAAAA</Text>

        <View style={styles.molduraImagem}>
          <Image
            style={styles.imagem}
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2946/2946177.png' }}
          />
          <View style={styles.linhaScan1} />
          <View style={styles.linhaScan2} />
        </View>

        <Text style={styles.nomeAtual}>
          {nome ? `> ${nome.toUpperCase()}_` : '> JOGADOR_'}
        </Text>

        <Text style={styles.rodape}>QUAL É SEU NOME?</Text>

        <View style={styles.linhaInput}>
          <TextInput
            style={styles.input}
            placeholder="Juca"
            placeholderTextColor="#1c4e77"
            value={nome}
            onChangeText={setNome}
          />
          <View style={styles.botaoPequeno}>
            <TouchableOpacity style={styles.botaoInterno} onPress={() => setNome('')}>
              <Text style={styles.botaoTexto}>X</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separador} />

        <View style={styles.linhaBotoes}>
          <View style={styles.botaoFlex}>
            <TouchableOpacity
              style={styles.botaoInterno}
              onPress={() => navigation.navigate('PedraPapelTesoura'), {PedraPapelTesoura}}
            >
              <Text style={styles.botaoTexto}>PEDRA{'\n'}PAPEL{'\n'}TESOURA</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 4,
  },
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