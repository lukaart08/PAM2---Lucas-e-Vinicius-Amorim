import { Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase/firebase';
import { estilos } from '../styles/estilos';
import { mostrarAlerta } from '../styles/alerta';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin() {
    if (!email || !senha) {
      mostrarAlerta('Atenção', 'Digite o e-mail e a senha.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('Home');
    } catch (error) {
      console.log(error);

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        mostrarAlerta('Erro', 'E-mail ou senha incorretos.');
      } else if (error.code === 'auth/invalid-email') {
        mostrarAlerta('Erro', 'Digite um e-mail válido.');
      } else {
        mostrarAlerta('Erro', 'Não foi possível realizar o login.\n(' + error.code + ')');
      }
    }
  }

  return (
    <View style={estilos.container}>
      <Image
        source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' }}
        style={estilos.imagem}
      />

      <Text style={estilos.texto}>Digite o e-mail</Text>
      <TextInput
        placeholder="fulano@hotmail.com"
        style={estilos.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.texto}>Senha</Text>
      <TextInput
        placeholder="abc@123"
        secureTextEntry
        style={estilos.input}
        value={senha}
        onChangeText={setSenha}
      />

      <View style={estilos.botao}>
        <Button title="Entrar" onPress={fazerLogin} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={estilos.link}>Não possui uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}