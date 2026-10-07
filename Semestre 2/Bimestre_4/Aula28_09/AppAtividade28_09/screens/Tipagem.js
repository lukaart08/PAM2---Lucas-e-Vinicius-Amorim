import { useState, useMemo } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TIPOS, LISTA_TIPOS, multiplicador, corTexto, formatarMult } from '../data/tiposData';

export default function TipagemScreen() {
  const navigation = useNavigation();
  const [ataque, setAtaque] = useState(null);
  const [defesa, setDefesa] = useState([]);

  const alternarDefesa = (tipo) => {
    setDefesa((atual) => {
      if (atual.includes(tipo)) return atual.filter((t) => t !== tipo);
      if (atual.length >= 2) return [atual[1], tipo]; // máximo 2 tipos na defesa
      return [...atual, tipo];
    });
  };

  const limpar = () => {
    setAtaque(null);
    setDefesa([]);
  };

  // Resultado: ataque escolhido contra a defesa escolhida
  const resultado = useMemo(() => {
    if (!ataque || !defesa.length) return null;
    const m = multiplicador(ataque, defesa);
    let texto, cor;
    if (m === 0) { texto = 'Não afeta o alvo'; cor = AZUL_ESCURO; }
    else if (m < 1) { texto = 'Pouco efetivo'; cor = AZUL; }
    else if (m === 1) { texto = 'Dano normal'; cor = '#6b7a99'; }
    else { texto = 'Super efetivo!'; cor = VERMELHO; }
    return { m, texto, cor };
  }, [ataque, defesa]);

  // Fraquezas da defesa escolhida (quem causa x2 ou x4)
  const fraquezas = useMemo(() => {
    if (!defesa.length) return [];
    return LISTA_TIPOS
      .map((t) => ({ tipo: t, m: multiplicador(t, defesa) }))
      .filter((x) => x.m > 1)
      .sort((a, b) => b.m - a.m);
  }, [defesa]);

  const Chip = ({ tipo, ativo, onPress, extra }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={[styles.chip, { borderColor: TIPOS[tipo].cor }, ativo && { backgroundColor: TIPOS[tipo].cor }]}
    >
      <Text style={[styles.chipTexto, { color: ativo ? corTexto(TIPOS[tipo].cor) : AZUL_ESCURO }]}>
        {TIPOS[tipo].nome}{extra ? `  ${extra}` : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.pagina}>
      <View style={styles.card}>
        <View style={styles.topo}>
          <Text style={styles.titulo}>Análise de tipagem</Text>
          <Text style={styles.subtitulo}>Escolha o ataque e a defesa</Text>
        </View>

        <View style={styles.corpo}>
          <Text style={styles.secao}>⚔️  Ataque <Text style={styles.dica}>(1 tipo)</Text></Text>
          <View style={styles.chips}>
            {LISTA_TIPOS.map((t) => (
              <Chip key={t} tipo={t} ativo={ataque === t} onPress={() => setAtaque(ataque === t ? null : t)} />
            ))}
          </View>

          <View style={styles.separador} />

          <Text style={styles.secao}>🛡️  Defesa <Text style={styles.dica}>(até 2 tipos)</Text></Text>
          <View style={styles.chips}>
            {LISTA_TIPOS.map((t) => (
              <Chip key={t} tipo={t} ativo={defesa.includes(t)} onPress={() => alternarDefesa(t)} />
            ))}
          </View>

          <View style={styles.separador} />

          {resultado ? (
            <View style={[styles.resultado, { borderColor: resultado.cor }]}>
              <Text style={styles.resultadoLinha}>
                {TIPOS[ataque].nome}  →  {defesa.map((d) => TIPOS[d].nome).join(' / ')}
              </Text>
              <Text style={[styles.resultadoValor, { color: resultado.cor }]}>{formatarMult(resultado.m)}</Text>
              <Text style={[styles.resultadoTexto, { color: resultado.cor }]}>{resultado.texto}</Text>
            </View>
          ) : (
            <Text style={styles.vazio}>Selecione um tipo de ataque e pelo menos um de defesa</Text>
          )}

          {fraquezas.length > 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={styles.secao}>Fraquezas da defesa</Text>
              <View style={styles.chips}>
                {fraquezas.map((f) => (
                  <Chip key={f.tipo} tipo={f.tipo} ativo extra={formatarMult(f.m)} />
                ))}
              </View>
            </View>
          )}

          <View style={styles.separador} />

          <TouchableOpacity style={[styles.botao, styles.botaoBorda]} onPress={limpar}>
            <Text style={styles.botaoBordaTexto}>Limpar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botao, styles.botaoVermelho, { marginTop: 10 }]} onPress={() => navigation.goBack()}>
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
  titulo: { color: '#ffffff', fontSize: 24, fontWeight: '800' },
  subtitulo: { color: '#cfdcff', fontSize: 14, marginTop: 2 },
  corpo: { padding: 20 },
  secao: { color: AZUL_ESCURO, fontSize: 16, fontWeight: '800', marginBottom: 8 },
  dica: { color: '#6b7a99', fontSize: 12, fontWeight: '500' },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { borderWidth: 2, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 11, margin: 3, backgroundColor: '#ffffff' },
  chipTexto: { fontWeight: '700', fontSize: 11 },
  separador: { height: 1, backgroundColor: BORDA, width: '100%', marginVertical: 16 },
  vazio: { color: '#6b7a99', fontSize: 14, textAlign: 'center' },
  resultado: { borderWidth: 3, borderRadius: 18, paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', backgroundColor: '#ffffff' },
  resultadoLinha: { color: AZUL_ESCURO, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  resultadoValor: { fontSize: 56, fontWeight: '900', marginVertical: 4 },
  resultadoTexto: { fontSize: 16, fontWeight: '800' },
  botao: { borderRadius: 14, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  botaoVermelho: { backgroundColor: VERMELHO },
  botaoTexto: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  botaoBorda: { borderWidth: 2, borderColor: AZUL, backgroundColor: '#ffffff' },
  botaoBordaTexto: { color: AZUL, fontSize: 15, fontWeight: '700' },
});