import Calculator from "./Calculator";
import CalculatorHistory from "./CalculatorHistory";
import NumberGuess from "./NumberGuess";
import ShoppingList from "./ShoppingList";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator"component={Calculator} />
        <Stack.Screen name="History"component={CalculatorHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}