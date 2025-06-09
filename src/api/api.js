import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANTE: Substitua pelo IP da sua VM onde o banco de dados está rodando.
// Se estiver usando emulador Android, o IP da máquina host é 10.0.2.2
const API_URL = 'http://<SEU_IP_LOCAL>:8080';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error("Erro ao ler o token do AsyncStorage", e);
  }
  return config;
});

export default api;