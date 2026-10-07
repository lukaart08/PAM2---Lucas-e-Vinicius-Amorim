import { useState } from 'react';
import { StyleSheet, ScrollView, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DescricaoInput from '../inputs/DescricaoInput';
import { TIPOS, corTexto } from '../data/tiposData';

const sprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const POKEMONS = [
  {
    id: 25,
    nome: 'Pikachu',
    tipos: ['electric'],
    descricao:
      'Pokémon Rato. Armazena eletricidade nas bochechas e a libera em descargas quando se sente ameaçado. Quanto mais Pikachu juntos, mais fortes ficam as tempestades de raios que eles criam. É um dos Pokémon mais queridos do mundo.',
  },
  {
    id: 493,
    nome: 'Arceus',
    tipos: ['normal'],
    descricao:
      'Pokémon Lendário conhecido como o Pokémon Original. Segundo as lendas, ele moldou o universo antes de qualquer outro ser existir. Ao segurar uma Placa, muda de tipo e passa a dominar o poder daquele elemento.',
  },
];

export default function PokedexScreen() {
  const navigation = useNavigation();
  const [descricoes, setDescricoes] = useState(
    Object.fromEntries(POKEMONS.map((p) => [p.id, p.descricao]))
  );

  const editar = (id, texto) => setDescricoes((d) => ({ ...d, [id]: texto }));
  const restaurar = (p) => editar(p.id, p.descricao);

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.card}>
        <View style={styles.topo}>
          <Text style={styles.titulo}>Pokédex</Text>
          <Text style={styles.subtitulo}>Edite a descrição de cada Pokémon</Text>
        </View>

        <View style={styles.corpo}>
          {POKEMONS.map((p, i) => (
            <View key={p.id} style={[styles.pokemon, i > 0 && styles.pokemonBorda]}>
              <View style={styles.cabecalho}>
                <View style={styles.molduraImagem}>
                  <Image style={styles.imagem} source={{ uri: sprite(p.id) }} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.numero}>#{String(p.id).padStart(3, '0')}</Text>
                  <Text style={styles.nome}>{p.nome}</Text>
                  <View style={styles.tipos}>
                    {p.tipos.map((t) => (
                      <View key={t} style={[styles.tipoTag, { backgroundColor: TIPOS[t].cor }]}>
                        <Text style={[styles.tipoTagTexto, { color: corTexto(TIPOS[t].cor) }]}>
                          {TIPOS[t].nome}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <DescricaoInput
                rotulo={`Descrição de ${p.nome}`}
                value={descricoes[p.id]}
                onChangeText={(texto) => editar(p.id, texto)}
                onReset={() => restaurar(p)}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.botaoTexto}>‹ Voltar</Text>
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
  topo: { backgroundColor: AZUL, paddingHorizontal: 22, paddingVertical: 20, borderBottomWidth: 6, borderBottomColor: VERMELHO },
  titulo: { color: '#ffffff', fontSize: 26, fontWeight: '800' },
  subtitulo: { color: '#cfdcff', fontSize: 14, marginTop: 2 },
  corpo: { padding: 20 },
  pokemon: { marginBottom: 18 },
  pokemonBorda: { borderTopWidth: 1, borderTopColor: BORDA, paddingTop: 18 },
  cabecalho: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  molduraImagem: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: AZUL_CLARO, alignItems: 'center',
    justifyContent: 'center', borderWidth: 3, borderColor: '#ffffff', marginRight: 14,
    shadowColor: AZUL_ESCURO, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 3,
  },
  imagem: { width: 68, height: 68 },
  numero: { color: VERMELHO, fontSize: 12, fontWeight: '700' },
  nome: { color: AZUL_ESCURO, fontSize: 22, fontWeight: '800' },
  tipos: { flexDirection: 'row', marginTop: 4 },
  tipoTag: { borderRadius: 20, paddingVertical: 3, paddingHorizontal: 10, marginRight: 6 },
  tipoTagTexto: { fontWeight: '700', fontSize: 11 },
  botaoVoltar: { backgroundColor: VERMELHO, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  botaoTexto: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
});