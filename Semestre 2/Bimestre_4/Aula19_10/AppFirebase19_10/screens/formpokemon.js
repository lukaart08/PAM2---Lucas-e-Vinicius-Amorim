import { Text, View, TextInput, Button, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import { estilos } from '../styles/estilos';
import { mostrarAlerta, confirmar } from '../styles/alerta';

const TIPOS = [
  'Normal', 'Fogo', 'Água', 'Planta', 'Elétrico', 'Gelo', 'Lutador', 'Veneno',
  'Terra', 'Voador', 'Psíquico', 'Inseto', 'Pedra', 'Fantasma', 'Dragão', 'Sombrio', 'Aço', 'Fada',
];

const API = 'https://pokeapi.co/api/v2';
const idDaUrl = (url) => Number(url.split('/').filter(Boolean).pop());
const imagemDoId = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const capitalizar = (s) => s.charAt(0).toUpperCase() + s.slice(1);

async function buscarImagem(nome) {
  try {
    const resposta = await fetch(`${API}/pokemon/${nome.trim().toLowerCase()}`);
    if (!resposta.ok) return null;
    const dados = await resposta.json();
    return dados.sprites.front_default;
  } catch (error) {
    return null;
  }
}

export default function FormPokemon({ navigation, route }) {
  const pokemon = route.params?.pokemon;
  const uid = auth.currentUser?.uid;
  const somenteLeitura = !!pokemon && pokemon.donoId !== uid;

  const [nome, setNome] = useState(pokemon?.nome ?? '');
  const [tipo, setTipo] = useState(pokemon?.tipo ?? '');
  const [nivel, setNivel] = useState(pokemon ? String(pokemon.nivel) : '');
  const [descricao, setDescricao] = useState(pokemon?.descricao ?? '');
  const [salvando, setSalvando] = useState(false);

  // --- pesquisa de Pokémon ---
  const [lista, setLista] = useState([]); // [{ id, nome }]
  const [carregandoLista, setCarregandoLista] = useState(true);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [previa, setPrevia] = useState(pokemon?.imagem ?? '');

  // Carrega todos os Pokémon (só nome + id, leve) uma vez
  useEffect(() => {
    if (somenteLeitura) return;
    let ativo = true;
    fetch(`${API}/pokemon?limit=1025&offset=0`)
      .then((r) => r.json())
      .then((dados) => {
        if (!ativo) return;
        setLista(dados.results.map((p) => ({ id: idDaUrl(p.url), nome: p.name })));
      })
      .catch((error) => console.log(error))
      .finally(() => ativo && setCarregandoLista(false));
    return () => {
      ativo = false;
    };
  }, [somenteLeitura]);

  // Filtra por nome ou número; quem começa com o texto aparece primeiro
  const sugestoes = useMemo(() => {
    const q = nome.trim().toLowerCase().replace(/^#/, '');
    if (!mostrarSugestoes || !q) return [];
    const achados = lista.filter((p) => p.nome.includes(q) || String(p.id) === q);
    achados.sort((a, b) => Number(b.nome.startsWith(q)) - Number(a.nome.startsWith(q)));
    return achados.slice(0, 8);
  }, [lista, nome, mostrarSugestoes]);

  function digitarNome(texto) {
    setNome(texto);
    setMostrarSugestoes(true);
    setPrevia(''); // o texto mudou, a prévia antiga não vale mais
  }

  function escolherPokemon(p) {
    setNome(capitalizar(p.nome));
    setPrevia(imagemDoId(p.id));
    setMostrarSugestoes(false);
  }

  async function salvar() {
    const nivelNumero = Number(nivel);

    if (!nome.trim() || !tipo || !nivel) {
      mostrarAlerta('Atenção', 'Preencha nome, tipo e nível.');
      return;
    }
    if (!Number.isInteger(nivelNumero) || nivelNumero < 1 || nivelNumero > 100) {
      mostrarAlerta('Atenção', 'O nível deve ser um número inteiro de 1 a 100.');
      return;
    }

    setSalvando(true);
    try {
      // Se escolheu da lista, já temos a imagem; senão tenta buscar pelo nome digitado
      const imagem = previa || (await buscarImagem(nome));
      const dados = {
        nome: nome.trim(),
        tipo,
        nivel: nivelNumero,
        descricao: descricao.trim(),
        imagem: imagem ?? '',
      };

      if (pokemon) {
        await updateDoc(doc(db, 'pokemons', pokemon.id), dados);
      } else {
        const perfil = await getDoc(doc(db, 'usuarios', uid));
        await addDoc(collection(db, 'pokemons'), {
          ...dados,
          donoId: uid,
          donoNome: perfil.exists() ? perfil.data().nome : 'Treinador',
          criadoEm: serverTimestamp(),
        });
      }

      navigation.goBack();
    } catch (error) {
      console.log(error);
      mostrarAlerta('Erro', 'Não foi possível salvar.\n(' + error.code + ')');
    } finally {
      setSalvando(false);
    }
  }

  // DELETE
  function pedirExclusao() {
    confirmar('Excluir Pokémon', `Excluir ${pokemon.nome}? Essa ação não pode ser desfeita.`, async () => {
      try {
        await deleteDoc(doc(db, 'pokemons', pokemon.id));
        navigation.goBack();
      } catch (error) {
        console.log(error);
        mostrarAlerta('Erro', 'Não foi possível excluir.\n(' + error.code + ')');
      }
    });
  }

  const titulo = !pokemon ? 'Registrar Pokémon' : somenteLeitura ? pokemon.nome : 'Editar Pokémon';

  return (
    // keyboardShouldPersistTaps: sem isso o 1º toque numa sugestão só fecha o teclado
    <ScrollView contentContainerStyle={estilos.scroll} keyboardShouldPersistTaps="handled">
      <Text style={estilos.titulo}>{titulo}</Text>

      {previa ? <Image source={{ uri: previa }} style={estilos.previa} /> : null}

      {somenteLeitura && (
        <Text style={[estilos.cardInfo, { textAlign: 'center' }]}>Treinador: {pokemon.donoNome}</Text>
      )}

      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        placeholder="Pesquise pelo nome ou número (ex.: Pikachu, 25)"
        style={[estilos.input, somenteLeitura && estilos.inputDesativado]}
        value={nome}
        onChangeText={digitarNome}
        editable={!somenteLeitura}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {!somenteLeitura && carregandoLista && <ActivityIndicator style={{ marginVertical: 6 }} />}

      {sugestoes.length > 0 && (
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff', marginBottom: 8 }}>
          {sugestoes.map((p) => (
            <TouchableOpacity
              key={p.id}
              onPress={() => escolherPokemon(p)}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 6, borderBottomWidth: 1, borderBottomColor: '#eee' }}
            >
              <Image source={{ uri: imagemDoId(p.id) }} style={{ width: 40, height: 40, marginRight: 10 }} />
              <Text style={{ flex: 1, fontSize: 16 }}>{capitalizar(p.nome)}</Text>
              <Text style={{ color: '#888' }}>#{p.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={estilos.texto}>Tipo</Text>
      <View style={estilos.linhaChips}>
        {TIPOS.map((t) => (
          <TouchableOpacity
            key={t}
            disabled={somenteLeitura}
            style={[estilos.chip, tipo === t && estilos.chipAtivo]}
            onPress={() => setTipo(t)}
          >
            <Text style={[estilos.chipTexto, tipo === t && estilos.chipTextoAtivo]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={estilos.texto}>Nível (1 a 100)</Text>
      <TextInput
        placeholder="Ex.: 25"
        keyboardType="numeric"
        style={[estilos.input, somenteLeitura && estilos.inputDesativado]}
        value={nivel}
        onChangeText={setNivel}
        editable={!somenteLeitura}
      />

      <Text style={estilos.texto}>Descrição</Text>
      <TextInput
        placeholder="Opcional"
        multiline
        style={[estilos.input, { minHeight: 80 }, somenteLeitura && estilos.inputDesativado]}
        value={descricao}
        onChangeText={setDescricao}
        editable={!somenteLeitura}
      />

      {!somenteLeitura && (
        <View style={estilos.botao}>
          <Button title={salvando ? 'Salvando...' : 'Salvar'} onPress={salvar} disabled={salvando} />
        </View>
      )}

      {pokemon && !somenteLeitura && (
        <View style={estilos.botao}>
          <Button title="Excluir Pokémon" color="#d32f2f" onPress={pedirExclusao} />
        </View>
      )}

      <View style={estilos.botao}>
        <Button title="Voltar" color="#777" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}