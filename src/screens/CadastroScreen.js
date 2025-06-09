import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import api from '../api/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { COLORS, FONTS, SIZES } from '../theme/theme';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/usuario', {
        nome,
        email,
        senha,
        tipoUsuario: 'SOLICITANTE', // Tipo padrão para novos cadastros via app
        status: true,
      });
      Alert.alert('Sucesso!', 'Usuário cadastrado. Agora você pode fazer o login.');
      navigation.navigate('Login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Não foi possível criar o usuário.';
      Alert.alert('Erro no Cadastro', errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <CustomInput label="Nome Completo" placeholder="Seu nome" value={nome} onChangeText={setNome} />
      <CustomInput label="Email" placeholder="seu-email@dominio.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <CustomInput label="Senha" placeholder="Crie uma senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <CustomButton title="Cadastrar" onPress={handleCadastro} />
      <CustomButton title="Voltar para o Login" onPress={() => navigation.goBack()} style={{ backgroundColor: COLORS.secondary }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: SIZES.padding, backgroundColor: COLORS.background },
  title: { ...FONTS.h2, color: COLORS.primary, textAlign: 'center', marginBottom: SIZES.padding },
});