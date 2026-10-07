import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function List() {
  const navigation = useNavigation();

  const usuario = [
    { id: '1', nome: 'Pikachu', rota: 'Game2' },
    { id: '2', nome: 'Ratata', rota: 'PedraPapelTesoura' },
    { id: '3', nome: 'Windersson Nunes', rota: 'CampoMinado' },
    { id: '4', nome: 'Arceus', rota: 'BolinhaDeGude' },
    { id: '5', nome: 'Patirizu', rota: 'Biroca' },
    { id: '6', nome: 'Ruyter', rota: 'JogoDaVida' },
  ];

  return (
    <View style={styles.pagina}>
      <View style={styles.card}>

        <View style={styles.topo}>
          <View style={styles.topoLinha}>
            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.botaoVoltarTexto}>‹ Home</Text>
            </TouchableOpacity>
            <Text style={styles.selecionar}>Selecionar</Text>
          </View>
          <Text style={styles.titulo}>Ideias de jogos</Text>
          <Text style={styles.subtitulo}>Escolha um modo</Text>
        </View>

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
              <View style={styles.indiceBolha}>
                <Text style={styles.itemIndice}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>
              <Text style={styles.itemTexto}>{item.nome}</Text>
              <Text style={styles.itemSeta}>›</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.rodape}>{usuario.length} jogos disponíveis</Text>
      </View>
    </View>
  );
}

const AZUL = '#1e4fd8';
const AZUL_ESCURO = '#0f2a6b';
const AZUL_CLARO = '#e8effc';
const VERMELHO = '#e63946';
const BORDA = '#d5def0';

const styles = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: AZUL_CLARO,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: '100%',
    maxWidth: 380,
    height: '90%',
    overflow: 'hidden',
    shadowColor: AZUL_ESCURO,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  topo: {
    backgroundColor: AZUL,
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 6,
    borderBottomColor: VERMELHO,
  },
  topoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoVoltar: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  botaoVoltarTexto: {
    color: AZUL,
    fontSize: 13,
    fontWeight: '700',
  },
  selecionar: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.9,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
  },
  subtitulo: {
    color: '#cfdcff',
    fontSize: 14,
    marginTop: 2,
  },
  lista: {
    flex: 1,
    width: '100%',
  },
  listaConteudo: {
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: BORDA,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  separadorItem: {
    height: 10,
  },
  indiceBolha: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: VERMELHO,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemIndice: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
  itemTexto: {
    flex: 1,
    color: AZUL_ESCURO,
    fontSize: 16,
    fontWeight: '700',
  },
  itemSeta: {
    color: AZUL,
    fontSize: 26,
    fontWeight: '700',
    paddingRight: 4,
  },
  rodape: {
    color: '#6b7a99',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: BORDA,
  },
});