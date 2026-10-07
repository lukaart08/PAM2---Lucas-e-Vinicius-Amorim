import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NomeInput from '../inputs/NomeInput';
import AvatarInput from '../inputs/AvatarInput';

export default function Home() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [avatar, setAvatar] = useState('');
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
          {avatar ? `${avatar} ` : ''}{nome ? `> ${nome.toUpperCase()}_` : '> JOGADOR_'}
        </Text>

        <Text style={styles.rodape}>QUAL É SEU NOME?</Text>

        <NomeInput
          value={nome}
          onChangeText={setNome}
          onClear={() => setNome('')}
        />

        <AvatarInput
          value={avatar}
          onChange={setAvatar}
        />

        <View style={styles.separador} />

        <View style={styles.linhaBotoes}>
          <View style={styles.botaoFlex}>
            <TouchableOpacity
              style={styles.botaoInterno}
              onPress={() => navigation.navigate('PedraPapelTesoura', { nome, avatar })}
            >
              <Text style={styles.botaoTexto}>PEDRA{'\n'}PAPEL{'\n'}TESOURA</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.botaoFlex}>
            <TouchableOpacity
              style={styles.botaoInterno}
              onPress={() => navigation.navigate('Game2')}
            >
              <Text style={styles.botaoTexto}>JOGO{'\n'}DA{'\n'}VELHA</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.botaoListaWrap}>
          <TouchableOpacity
            style={styles.botaoLista}
            onPress={() => navigation.navigate('FlatList')}
          >
            <Text style={styles.botaoListaTexto}>VER LISTA COMPLETA {'>'}</Text>
          </TouchableOpacity>
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
  botaoListaWrap: {
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  botaoLista: {
    backgroundColor: '#03101f',
    borderWidth: 1,
    borderColor: '#ff3d6e',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoListaTexto: {
    color: '#ff3d6e',
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
  rodape: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#3a6a94',
    letterSpacing: 1,
  },
});