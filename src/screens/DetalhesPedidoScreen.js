import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import api from '../api/api';
import CustomButton from '../components/CustomButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { COLORS, FONTS, SIZES } from '../theme/theme';

export default function DetalhesPedidoScreen({ route, navigation }) {
  const { pedidoId } = route.params;
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // Loading para ações
  const [refreshing, setRefreshing] = useState(false);

  const fetchDetalhes = useCallback(async () => {
    try {
      if(!refreshing) setLoading(true);
      const response = await api.get(`/pedido-ajuda/${pedidoId}`);
      setPedido(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do pedido.');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [pedidoId, navigation, refreshing]);

  useEffect(() => {
    fetchDetalhes();
  }, [fetchDetalhes]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDetalhes().then(() => setRefreshing(false));
  }, [fetchDetalhes]);

  const handleUpdateStatus = async (novoStatus) => {
    setActionLoading(true);
    try {
      const updateDto = {
        tipoAjuda: pedido.tipoAjuda,
        descricão: pedido.descricao,
        latitude: pedido.latitude,
        longitude: pedido.longitude,
        endereco: pedido.endereco,
        dataPedido: pedido.dataPedido,
        statusPedido: novoStatus, // Novo status passado como parâmetro
        idUsuario: pedido.usuario.id,
      };

      await api.put(`/pedido-ajuda/${pedido.id}`, updateDto);
      
      Alert.alert('Sucesso!', `O status do pedido foi atualizado para ${novoStatus}.`);
      fetchDetalhes(); // Atualiza os dados na tela

    } catch (error) {
      console.error("Erro ao atualizar status:", error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível atualizar o status no momento.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: async () => {
            setActionLoading(true);
            try {
              await api.delete(`/pedido-ajuda/${pedido.id}`);
              Alert.alert('Sucesso', 'Pedido excluído.');
              navigation.goBack();
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Falha ao excluir o pedido.');
            } finally {
              setActionLoading(false);
            }
          } 
        },
      ]
    );
  };
  
  if (loading && !pedido) {
    return <LoadingIndicator />;
  }
  
  if (!pedido) {
    return (
        <View style={styles.container}>
            <Text>Pedido não encontrado.</Text>
        </View>
    );
  }

  return (
    <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
    >
      <Text style={styles.title}>{pedido.tipoAjuda}</Text>
      
      <View style={styles.detailCard}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{pedido.statusPedido}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Solicitante:</Text>
          <Text style={styles.value}>{pedido.usuario ? pedido.usuario.nome : 'Não informado'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.value}>{pedido.endereco || "Não informado"}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Descrição Completa:</Text>
          <Text style={styles.value}>{pedido.descricao}</Text>
        </View>
      </View>
      
      {actionLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }}/>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Aceitar Pedido" 
            onPress={() => handleUpdateStatus('EM_ATENDIMENTO')}
            disabled={pedido.statusPedido !== 'PENDENTE'}
          />
          <CustomButton 
            title="Concluir Pedido"
            onPress={() => handleUpdateStatus('CONCLUIDO')}
            disabled={pedido.statusPedido !== 'EM_ATENDIMENTO'}
            style={{backgroundColor: COLORS.success}} // Cor verde para sucesso
          />
          <CustomButton 
            title="Excluir Pedido" 
            onPress={handleDelete} 
            style={{backgroundColor: COLORS.error}}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    title: { ...FONTS.h1, color: COLORS.primary, textAlign: 'center', marginVertical: SIZES.padding / 2 },
    detailCard: { backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, padding: SIZES.padding, borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.lightGray },
    detailRow: { marginBottom: SIZES.padding / 1.5 },
    label: { ...FONTS.h3, fontWeight: 'bold', color: COLORS.darkGray },
    value: { ...FONTS.body, color: COLORS.secondary, marginTop: SIZES.base / 2 },
    buttonContainer: { marginTop: SIZES.padding, paddingHorizontal: SIZES.padding },
});
