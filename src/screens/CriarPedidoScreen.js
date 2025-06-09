import { useState } from 'react';
import { Text, StyleSheet, Alert, ScrollView } from 'react-native';
import api from '../api/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { COLORS, FONTS, SIZES } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function CriarPedidoScreen({ navigation }) {
  const [tipoAjuda, setTipoAjuda] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCriarPedido = async () => {
    if (!tipoAjuda || !descricao) {
      Alert.alert('Atenção', 'Tipo de ajuda e descrição são obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error("Token não encontrado, faça o login novamente.");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;

      // Objeto de dados para enviar à API
      const pedidoData = {
        tipoAjuda: tipoAjuda,
        descricão: descricao,
        endereco: endereco,
        latitude: -23.55,
        longitude: -46.63,
        statusPedido: 'PENDENTE',
        idUsuario: userId,
        dataPedido: new Date().toISOString(), 
      };
      
      console.log("Enviando para API:", JSON.stringify(pedidoData, null, 2));

      await api.post('/pedido-ajuda', pedidoData);
      
      Alert.alert('Sucesso!', 'Seu pedido de ajuda foi enviado.');
      navigation.goBack();

    } catch (error) {
      console.error("Erro ao criar pedido:", error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível criar o pedido. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
      return <LoadingIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Descreva sua Necessidade</Text>
      <CustomInput label="Tipo de Ajuda" placeholder="Ex: Alimentos, Transporte, Abrigo" value={tipoAjuda} onChangeText={setTipoAjuda} />
      <CustomInput label="Descrição Detalhada" placeholder="Descreva o que você precisa com detalhes" multiline numberOfLines={4} value={descricao} onChangeText={setDescricao} style={{height: 120, textAlignVertical: 'top'}} />
      <CustomInput label="Endereço ou Ponto de Referência" placeholder="Onde a ajuda é necessária?" value={endereco} onChangeText={setEndereco} />
      <CustomButton title="Enviar Pedido de Ajuda" onPress={handleCriarPedido} style={{marginTop: 20}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: SIZES.padding, backgroundColor: COLORS.background },
    title: { ...FONTS.h2, color: COLORS.darkGray, textAlign: 'center', marginBottom: SIZES.padding },
});
