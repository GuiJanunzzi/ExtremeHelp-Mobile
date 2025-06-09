import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import HomeScreen from '../screens/HomeScreen';
import CriarPedidoScreen from '../screens/CriarPedidoScreen';
import DetalhesPedidoScreen from '../screens/DetalhesPedidoScreen';
import LoadingIndicator from '../components/LoadingIndicator';
import { COLORS } from '../theme/theme';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Cadastro" component={CadastroScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: COLORS.primary },
      headerTintColor: COLORS.white,
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen name="ExtremeHelp" component={HomeScreen} />
    <Stack.Screen name="CriarPedido" component={CriarPedidoScreen} options={{ title: 'Novo Pedido de Ajuda' }} />
    <Stack.Screen name="DetalhesPedido" component={DetalhesPedidoScreen} options={{ title: 'Detalhes do Pedido' }} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return userToken ? <AppStack /> : <AuthStack />;
}