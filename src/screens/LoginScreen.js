import { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { COLORS, FONTS, SIZES } from '../theme/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(''); 
  const [senha, setSenha] = useState(''); 
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    const success = await login(email, senha);
    if (!success) {
      Alert.alert('Erro no Login', 'Email ou senha inválidos. Tente novamente.');
    }
    setLoading(false);
    // A navegação será tratada automaticamente pelo AppNavigator
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExtremeHelp</Text>
      <Text style={styles.subtitle}>Bem-vindo(a) de volta!</Text>
      <CustomInput
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        label="Senha"
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <CustomButton title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: SIZES.padding, backgroundColor: COLORS.background },
  title: { ...FONTS.h1, color: COLORS.primary, textAlign: 'center' },
  subtitle: { ...FONTS.body, color: COLORS.secondary, textAlign: 'center', marginBottom: SIZES.padding * 2 },
  linkText: { ...FONTS.body, color: COLORS.primary, textAlign: 'center', marginTop: SIZES.base }
});