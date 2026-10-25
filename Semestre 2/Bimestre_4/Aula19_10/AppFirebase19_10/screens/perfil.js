import { Text, View, TextInput, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import { estilos } from '../styles/estilos';
import { mostrarAlerta, confirmar } from '../styles/alerta';

export default function Perfil({ navigation }) {
  const [nome, setNome] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');

  useEffect(() => {
    async function carregar() {
      const snap = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
      if (snap.exists()) setNome(snap.data().nome);
    }
    carregar();
  }, []);

  async function pokemonsDoUsuario() {
    const q = query(collection(db, 'pokemons'), where('donoId', '==', auth.currentUser.uid));
    return getDocs(q);
  }

  async function salvar() {
    if (!nome.trim()) {
      mostrarAlerta('Atenção', 'O nome não pode ficar vazio.');
      return;
    }

    try {
      const novoNome = nome.trim();
      await updateDoc(doc(db, 'usuarios', auth.currentUser.uid), { nome: novoNome });

      const meus = await pokemonsDoUsuario();
      await Promise.all(meus.docs.map((d) => updateDoc(d.ref, { donoNome: novoNome })));

      mostrarAlerta('Pronto', 'Nome atualizado.');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      mostrarAlerta('Erro', 'Não foi possível atualizar.\n(' + error.code + ')');
    }
  }

  function pedirExclusao() {
    if (!senhaAtual) {
      mostrarAlerta('Atenção', 'Digite sua senha para excluir a conta.');
      return;
    }
    confirmar(
      'Excluir conta',
      'Sua conta e todos os seus Pokémon serão apagados. Continuar?',
      excluirConta
    );
  }

  async function excluirConta() {
    try {
      const user = auth.currentUser;

      const credencial = EmailAuthProvider.credential(user.email, senhaAtual);
      await reauthenticateWithCredential(user, credencial);

      const meus = await pokemonsDoUsuario();
      await Promise.all(meus.docs.map((d) => deleteDoc(d.ref)));
      await deleteDoc(doc(db, 'usuarios', user.uid));
      await deleteUser(user);

      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      console.log(error);

      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        mostrarAlerta('Erro', 'Senha incorreta.');
      } else {
        mostrarAlerta('Erro', 'Não foi possível excluir a conta.\n(' + error.code + ')');
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.scroll}>
      <Text style={estilos.titulo}>Meu perfil</Text>

      <Text style={estilos.texto}>E-mail</Text>
      <Text style={estilos.dado}>{auth.currentUser?.email}</Text>

      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        style={estilos.input}
        value={nome}
        onChangeText={setNome}
      />

      <View style={estilos.botao}>
        <Button title="Salvar" onPress={salvar} />
      </View>

      <View style={estilos.botao}>
        <Button title="Voltar" color="#777" onPress={() => navigation.goBack()} />
      </View>

      <View style={estilos.perigo}>
        <Text style={estilos.texto}>Senha atual (necessária para excluir a conta)</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          style={estilos.input}
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />
        <View style={estilos.botao}>
          <Button title="Excluir conta" color="#d32f2f" onPress={pedirExclusao} />
        </View>
      </View>
    </ScrollView>
  );
}