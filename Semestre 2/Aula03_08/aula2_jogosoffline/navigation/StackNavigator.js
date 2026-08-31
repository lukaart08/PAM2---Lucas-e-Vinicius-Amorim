import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home';
import List from '../screens/FlatList';
import game1 from '../screens/game1';
import game2 from '../screens/game2';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FlatList" component={FlatList} />
        <Stack.Screen name="PedraPapelTesoura" component={game1} />
        <Stack.Screen name="Game2" component={game2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}