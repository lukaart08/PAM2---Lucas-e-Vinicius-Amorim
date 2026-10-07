import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PokoPika() {
  const navigation = useNavigation();
  const [relogio, setRelogio] = useState('00:00:00');

  useEffect(() => {
    const atualizar = () => setRelogio(new Date().toLocaleTimeString('pt-BR'));
    atualizar();
    const intervalo = setInterval(atualizar, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.card}>

        <View style={styles.topo}>
          <View style={styles.topoLinha}>
            <View style={styles.pokebola}>
              <View style={styles.pokebolaCentro} />
            </View>
            <Text style={styles.relogio}>{relogio}</Text>
          </View>
          <Text style={styles.titulo}>PokoPika</Text>
          <Text style={styles.subtitulo}>Seu guia Pokémon</Text>
        </View>

        <View style={styles.corpo}>
          <View style={styles.molduraImagem}>
            <Image
              style={styles.imagem}
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' }}
            />
          </View>

          <View style={styles.linhaBotoes}>
            <TouchableOpacity
              style={[styles.botao, styles.botaoAzul, { marginRight: 10 }]}
              onPress={() => navigation.navigate('Tipagem')}
            >
              <Text style={styles.botaoTitulo}>Analisar</Text>
              <Text style={styles.botaoSub}>tipagem</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.botaoVermelho]}
              onPress={() => navigation.navigate('Pokedex')}
            >
              <Text style={styles.botaoTitulo}>Pokédex</Text>
              <Text style={styles.botaoSub}>descrições</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.botaoLista}
            onPress={() => navigation.navigate('FlatList')}
          >
            <Text style={styles.botaoListaTexto}>Ver lista completa  ›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const AZUL = '#1e4fd8';
const AZUL_ESCURO = '#0f2a6b';
const AZUL_CLARO = '#e8effc';
const VERMELHO = '#e63946';
const BORDA = '#d5def0';

const styles = StyleSheet.create({
  pagina: { flexGrow: 1, backgroundColor: AZUL_CLARO, alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: '#ffffff', borderRadius: 24, width: '100%', maxWidth: 380, overflow: 'hidden',
    shadowColor: AZUL_ESCURO, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 8,
  },
  topo: { backgroundColor: AZUL, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 22, borderBottomWidth: 6, borderBottomColor: VERMELHO },
  topoLinha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  pokebola: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#ffffff',
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  pokebolaCentro: { width: 8, height: 8, borderRadius: 4, backgroundColor: VERMELHO, borderWidth: 2, borderColor: AZUL_ESCURO },
  relogio: { color: '#ffffff', fontSize: 13, fontWeight: '600', opacity: 0.9 },
  titulo: { color: '#ffffff', fontSize: 34, fontWeight: '800', letterSpacing: 0.5 },
  subtitulo: { color: '#cfdcff', fontSize: 14, marginTop: 2 },
  corpo: { padding: 22, alignItems: 'center' },
  molduraImagem: {
    width: 190, height: 190, borderRadius: 95, backgroundColor: AZUL_CLARO, alignItems: 'center',
    justifyContent: 'center', borderWidth: 4, borderColor: '#ffffff', marginTop: -70, marginBottom: 20,
    shadowColor: AZUL_ESCURO, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 4,
  },
  imagem: { width: 150, height: 150 },
  linhaBotoes: { flexDirection: 'row', width: '100%', marginBottom: 12 },
  botao: { flex: 1, borderRadius: 14, paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  botaoAzul: { backgroundColor: AZUL },
  botaoVermelho: { backgroundColor: VERMELHO },
  botaoTitulo: { color: '#ffffff', fontSize: 17, fontWeight: '700' },
  botaoSub: { color: '#ffffff', fontSize: 12, opacity: 0.85, marginTop: 2 },
  botaoLista: {
    width: '100%', borderRadius: 14, borderWidth: 2, borderColor: AZUL, paddingVertical: 13,
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff',
  },
  botaoListaTexto: { color: AZUL, fontSize: 14, fontWeight: '700' },
});