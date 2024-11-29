import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://app.blackpay.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function buscarTransacao(
  transactionId: string,
  clientIdentifier: string,
  publicKey: string,
  secretKey: string
) {
  try {
    const response = await apiClient.get('/gateway/transactions', {
      params: {
        id: transactionId,
        clientIdentifier,
      },
      headers: {
        'x-public-key': publicKey,
        'x-secret-key': secretKey,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar transação:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Erro ao acessar a API');
  }
}
