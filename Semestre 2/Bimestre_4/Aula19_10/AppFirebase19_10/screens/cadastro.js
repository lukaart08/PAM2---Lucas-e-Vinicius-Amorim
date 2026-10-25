import { Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import { estilos } from '../styles/estilos';
import { mostrarAlerta } from '../styles/alerta';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function cadastrar() {
    if (!nome || !email || !senha || !confirmarSenha) {
      mostrarAlerta('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      mostrarAlerta('Atenção', 'As senhas não são iguais.');
      return;
    }

    try {
      const usuarioCriado = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = usuarioCriado.user.uid;

      await setDoc(doc(db, 'usuarios', uid), { nome, email });

      navigation.replace('Home');
    } catch (error) {
      console.log(error);

      if (error.code === 'auth/email-already-in-use') {
        mostrarAlerta('Erro', 'Este e-mail já está cadastrado.');
      } else if (error.code === 'auth/invalid-email') {
        mostrarAlerta('Erro', 'Digite um e-mail válido.');
      } else if (error.code === 'auth/weak-password') {
        mostrarAlerta('Erro', 'A senha precisa ter pelo menos 6 caracteres.');
      } else {
        mostrarAlerta('Erro', 'Não foi possível realizar o cadastro.\n(' + error.code + ')');
      }
    }
  }

  return (
    <View style={estilos.container}>
      <Image
        source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' }}
        style={estilos.imagem}
      />

      <Text style={estilos.titulo}>Criar conta de treinador</Text>

      <Text style={estilos.texto}>Nome</Text>
      <TextInput
        placeholder="Digite seu nome"
        style={estilos.input}
        value={nome}
        onChangeText={setNome}
      />

      <Text style={estilos.texto}>E-mail</Text>
      <TextInput
        placeholder="fulano@hotmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        style={estilos.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={estilos.texto}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        style={estilos.input}
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={estilos.texto}>Confirmar senha</Text>
      <TextInput
        placeholder="Digite a senha novamente"
        secureTextEntry
        style={estilos.input}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <View style={estilos.botao}>
        <Button title="Cadastrar" onPress={cadastrar} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={estilos.link}>Já possui uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}