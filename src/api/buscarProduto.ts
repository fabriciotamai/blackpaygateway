import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://app.blackpay.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function buscarDadosProdutor(publicKey: string, secretKey: string) {
  try {
    const response = await apiClient.get('/gateway/producer', {
      headers: {
        'x-public-key': publicKey,
        'x-secret-key': secretKey,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar dados do produtor:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Erro ao acessar a API');
  }
}
