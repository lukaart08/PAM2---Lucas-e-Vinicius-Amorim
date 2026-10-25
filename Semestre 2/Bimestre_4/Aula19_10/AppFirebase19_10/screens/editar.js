import { Text, View, TextInput, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import { estilos } from '../styles/estilos';

export default function Editar({ navigation }) {
  const [nome, setNome] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');

  useEffect(() => {
    async function carregar() {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const snap = await getDoc(doc(db, 'usuarios', uid));
      if (snap.exists()) setNome(snap.data().nome);
    }
    carregar();
  }, []);

  // UPDATE
  async function salvar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O nome não pode ficar vazio.');
      return;
    }

    try {
      await updateDoc(doc(db, 'usuarios', auth.currentUser.uid), { nome: nome.trim() });
      Alert.alert('Pronto', 'Nome atualizado.');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível atualizar.');
    }
  }

  // DELETE
  function confirmarExclusao() {
    if (!senhaAtual) {
      Alert.alert('Atenção', 'Digite sua senha para excluir a conta.');
      return;
    }

    Alert.alert('Excluir conta', 'Essa ação não pode ser desfeita. Continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: excluirConta },
    ]);
  }

  async function excluirConta() {
    try {
      const user = auth.currentUser;

      const credencial = EmailAuthProvider.credential(user.email, senhaAtual);
      await reauthenticateWithCredential(user, credencial);

      await deleteDoc(doc(db, 'usuarios', user.uid));
      await deleteUser(user);

      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      console.log(error);
      //nada funciona nessa desgraça
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        Alert.alert('Erro', 'Senha incorreta.');
      } else {
        Alert.alert('Erro', 'Não foi possível excluir a conta.');
      }
    }
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Editar perfil</Text>

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

      <View style={estilos.perigo}>
        <Text style={estilos.texto}>Senha atual (necessária para excluir)</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          style={estilos.input}
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />
        <View style={estilos.botao}>
          <Button title="Excluir conta" color="#d32f2f" onPress={confirmarExclusao} />
        </View>
      </View>
    </View>
  );
}