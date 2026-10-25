import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  // Telas centralizadas (login e cadastro)
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  // Telas com rolagem / listas
  tela: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: '#fff' },
  scroll: { flexGrow: 1, padding: 24, paddingTop: 40, backgroundColor: '#fff' },

  imagem: { width: 100, height: 100, alignSelf: 'center', marginBottom: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  texto: { fontSize: 16, marginTop: 8, marginBottom: 4 },
  dado: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, fontSize: 16 },
  inputDesativado: { backgroundColor: '#f2f2f2', color: '#555' },
  botao: { marginTop: 16 },
  link: { marginTop: 16, textAlign: 'center', color: '#1a73e8' },
  perigo: { marginTop: 32, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#ddd' },

  // Cabeçalho da Home
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cabecalhoBotoes: { flexDirection: 'row', gap: 8 },

  // Filtros e chips (tipos)
  linhaChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#ccc' },
  chipAtivo: { backgroundColor: '#e53935', borderColor: '#e53935' },
  chipTexto: { fontSize: 14, color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },

  // Cards da lista
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, marginTop: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10 },
  cardImagem: { width: 64, height: 64, marginRight: 12 },
  cardSemImagem: { width: 64, height: 64, marginRight: 12, borderRadius: 32, backgroundColor: '#eee' },
  cardNome: { fontSize: 18, fontWeight: 'bold' },
  cardInfo: { fontSize: 14, color: '#555', marginTop: 2 },
  vazio: { textAlign: 'center', color: '#777', marginTop: 32 },
  previa: { width: 120, height: 120, alignSelf: 'center', marginBottom: 8 },
});