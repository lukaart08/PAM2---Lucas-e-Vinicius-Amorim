import { Text, View, TextInput, Button, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import { estilos } from '../styles/estilos';
import { mostrarAlerta } from '../styles/alerta';

// CRUD — READ: lista os Pokémon de todos os treinadores (ou só os seus)
export default function Home({ navigation }) {
  const [pokemons, setPokemons] = useState([]);
  const [filtro, setFiltro] = useState('todos'); // 'todos' | 'meus'
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  const uid = auth.currentUser?.uid;

  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        try {
          const q = query(collection(db, 'pokemons'), orderBy('criadoEm', 'desc'));
          const snap = await getDocs(q);
          setPokemons(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch (error) {
          console.log(error);
          mostrarAlerta('Erro', 'Não foi possível carregar os Pokémon.\n(' + error.code + ')');
        } finally {
          setCarregando(false);
        }
      }
      carregar();
    }, [])
  );

  async function sair() {
    await signOut(auth);
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  function abrir(p) {
    navigation.navigate('FormPokemon', {
      pokemon: {
        id: p.id,
        nome: p.nome,
        tipo: p.tipo,
        nivel: p.nivel,
        descricao: p.descricao,
        imagem: p.imagem,
        donoId: p.donoId,
        donoNome: p.donoNome,
      },
    });
  }

  const lista = pokemons
    .filter((p) => filtro === 'todos' || p.donoId === uid)
    .filter((p) => p.nome.toLowerCase().includes(busca.trim().toLowerCase()));

  if (carregando) {
    return (
      <View style={estilos.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={estilos.tela}>
      <View style={estilos.cabecalho}>
        <Text style={[estilos.titulo, { marginBottom: 0 }]}>Pokédex</Text>
        <View style={estilos.cabecalhoBotoes}>
          <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
          <Button title="Sair" color="#777" onPress={sair} />
        </View>
      </View>

      <Button title="+ Registrar Pokémon" onPress={() => navigation.navigate('FormPokemon')} />

      <TextInput
        placeholder="Buscar pelo nome"
        style={[estilos.input, { marginTop: 12 }]}
        value={busca}
        onChangeText={setBusca}
      />

      <View style={estilos.linhaChips}>
        {[
          ['todos', 'Todos'],
          ['meus', 'Meus'],
        ].map(([valor, rotulo]) => (
          <TouchableOpacity
            key={valor}
            style={[estilos.chip, filtro === valor && estilos.chipAtivo]}
            onPress={() => setFiltro(valor)}
          >
            <Text style={[estilos.chipTexto, filtro === valor && estilos.chipTextoAtivo]}>{rotulo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            {filtro === 'meus' ? 'Você ainda não registrou nenhum Pokémon.' : 'Nenhum Pokémon encontrado.'}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.card} onPress={() => abrir(item)}>
            {item.imagem ? (
              <Image source={{ uri: item.imagem }} style={estilos.cardImagem} />
            ) : (
              <View style={estilos.cardSemImagem} />
            )}
            <View>
              <Text style={estilos.cardNome}>{item.nome}</Text>
              <Text style={estilos.cardInfo}>
                {item.tipo} · Nível {item.nivel}
              </Text>
              <Text style={estilos.cardInfo}>
                Treinador: {item.donoId === uid ? 'você' : item.donoNome}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}