import { Text, View, TextInput, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import { estilos } from '../styles/estilos';
import { mostrarAlerta, confirmar } from '../styles/alerta';

const TIPOS = [
  'Normal', 'Fogo', 'Água', 'Planta', 'Elétrico', 'Gelo', 'Lutador', 'Veneno',
  'Terra', 'Voador', 'Psíquico', 'Inseto', 'Pedra', 'Fantasma', 'Dragão', 'Sombrio', 'Aço', 'Fada',
];
//eu vou enlouquecer
async function buscarImagem(nome) {
  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.trim().toLowerCase()}`);
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
      const imagem = await buscarImagem(nome);
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
    <ScrollView contentContainerStyle={estilos.scroll}>
      <Text style={estilos.titulo}>{titulo}</Text>

      {pokemon?.imagem ? <Image source={{ uri: pokemon.imagem }} style={estilos.previa} /> : null}

      {somenteLeitura && (
        <Text style={[estilos.cardInfo, { textAlign: 'center' }]}>Treinador: {pokemon.donoNome}</Text>
      )}

      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        placeholder="Ex.: Pikachu"
        style={[estilos.input, somenteLeitura && estilos.inputDesativado]}
        value={nome}
        onChangeText={setNome}
        editable={!somenteLeitura}
      />

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