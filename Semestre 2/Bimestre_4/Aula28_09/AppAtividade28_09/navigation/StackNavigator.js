import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import FlatList from '../screens/FlatList';
import Tipagem from '../screens/Tipagem';
import Pokedex from '../screens/Pokedex';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FlatList" component={FlatList} />
        <Stack.Screen name="Tipagem" component={Tipagem} />
        <Stack.Screen name="Pokedex" component={Pokedex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}