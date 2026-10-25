import { Alert, Platform } from 'react-native';

export function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export function confirmar(titulo, mensagem, aoConfirmar, textoBotao = 'Excluir') {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titulo}\n\n${mensagem}`)) aoConfirmar();
  } else {
    Alert.alert(titulo, mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      { text: textoBotao, style: 'destructive', onPress: aoConfirmar },
    ]);
  }
}