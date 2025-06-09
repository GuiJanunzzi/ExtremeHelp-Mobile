import { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { COLORS, FONTS, SIZES } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const { logout } = useContext(AuthContext);

  const fetchPedidos = useCallback(async () => {
    try {
      // Inicia o loading apenas se não for um refresh
      if (!refreshing) setLoading(true);
      const response = await api.get('/pedido-ajuda'); // Endpoint de listar pedidos
      setPedidos(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os pedidos de ajuda.');
    } finally {
      setLoading(false);
    }
  }, [refreshing]);

  useEffect(() => {
    if (isFocused) {
      fetchPedidos();
    }
  }, [isFocused, fetchPedidos]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPedidos().then(() => setRefreshing(false));
  }, [fetchPedidos]);
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={{ marginRight: SIZES.padding / 2}}>
          <Text style={{ color: COLORS.white, ...FONTS.body }}>Sair</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, logout]);


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        // ===== LINHA DE DEPURAÇÃO ADICIONADA AQUI =====
        console.log('Navegando para detalhes com o ID:', item.id);
        
        // Verificação para garantir que o ID não é nulo/undefined antes de navegar
        if (item.id) {
          navigation.navigate('DetalhesPedido', { pedidoId: item.id });
        } else {
          Alert.alert('Erro', 'Este pedido não tem um ID válido para ser visualizado.');
        }
      }}
    >
      <Text style={styles.itemTitle}>{item.tipoAjuda || 'Tipo não informado'}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>{item.descricao || 'Sem descrição'}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.statusPedido || 'Status desconhecido'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <CustomButton
        title="Preciso de Ajuda"
        onPress={() => navigation.navigate('CriarPedido')}
      />
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum pedido de ajuda no momento.</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: SIZES.padding / 2, backgroundColor: COLORS.background },
    itemContainer: { backgroundColor: COLORS.white, padding: SIZES.padding / 1.5, marginVertical: SIZES.base, borderRadius: SIZES.radius, borderWidth: 1, borderColor: COLORS.lightGray },
    itemTitle: { ...FONTS.h3, color: COLORS.primary, fontWeight: 'bold' },
    itemDescription: { ...FONTS.body, color: COLORS.darkGray, marginVertical: SIZES.base / 2 },
    statusContainer: { alignSelf: 'flex-start', marginTop: SIZES.base, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: COLORS.lightGray, borderRadius: SIZES.radius },
    statusText: { ...FONTS.body, color: COLORS.secondary, fontSize: 12 },
    emptyText: { textAlign: 'center', marginTop: 50, ...FONTS.body, color: COLORS.secondary },
});