import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function List() {
  const navigation = useNavigation();

  const usuario = [
    { id: '1', nome: 'Jogo da velha', rota: 'Game2' },
    { id: '2', nome: 'Pedra, papel e tesoura', rota: 'PedraPapelTesoura' },
    { id: '3', nome: 'Campo minado', rota: 'CampoMinado' },
    { id: '4', nome: 'Bolinha de gude', rota: 'BolinhaDeGude' },
    { id: '5', nome: 'Biroca', rota: 'Biroca' },
    { id: '6', nome: 'Jogo da vida', rota: 'JogoDaVida' },
  ];

  return (
    <View style={styles.pagina}>
      <View style={styles.tvFrame}>

        <View style={styles.barraTopo}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.botaoVoltarTexto}>{'<'} HOME</Text>
          </TouchableOpacity>
          <Text style={styles.relogio}>SELECT</Text>
        </View>

        <Text style={styles.titulo}>IDEIAS DE JOGOS</Text>
        <Text style={styles.subtitulo}>&gt; ESCOLHA UM MODO_</Text>

        <FlatList
          data={usuario}
          keyExtractor={(item) => item.id}
          style={styles.lista}
          contentContainerStyle={styles.listaConteudo}
          ItemSeparatorComponent={() => <View style={styles.separadorItem} />}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate(item.rota)}
            >
              <Text style={styles.itemIndice}>
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Text style={styles.itemTexto}>{item.nome.toUpperCase()}</Text>
              <Text style={styles.itemSeta}>{'>'}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.rodape}>{usuario.length} JOGOS DISPONÍVEIS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
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
    height: '90%',
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
  botaoVoltar: {
    borderWidth: 1,
    borderColor: '#ff3d6e',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  botaoVoltarTexto: {
    color: '#ff3d6e',
    fontFamily: 'monospace',
    fontSize: 11,
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
    fontSize: 18,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#5ad1ff',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitulo: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#3a6a94',
    textAlign: 'center',
    marginBottom: 14,
  },
  lista: {
    width: '100%',
  },
  listaConteudo: {
    paddingBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03101f',
    borderWidth: 1,
    borderColor: '#1c4e77',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  separadorItem: {
    height: 10,
  },
  itemIndice: {
    color: '#ff3d6e',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 10,
    width: 22,
  },
  itemTexto: {
    flex: 1,
    color: '#5ad1ff',
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  itemSeta: {
    color: '#00e5ff',
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: '700',
  },
  rodape: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#3a6a94',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 12,
  },
});