import { NavigateContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home';
import Game from '../screens/Game';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigateContainer>
        <Stack.Navigator>

            <Stack.Screen 
            name="Home" 
            component={Home} 
            />

            <Stack.Screen
            name="PedraPapelTesoura" 
            component={Game} 
            />
        </Stack.Navigator> 
    </NavigateContainer>
    );
}