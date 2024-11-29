import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const apiClient = axios.create({
  baseURL: 'https://app.blackpay.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function criarTransacaoPix(
  client: {
    name: string;
    email: string;
    phone: string;
    cpf: string; 
  },
  publicKey: string,
  secretKey: string
) {
  const identifier = uuidv4(); 
  const amount = 19.9; 
  const callbackUrl = 'https://blackpaygateway.vercel.app/api/transactions/pix/callback'

  // Limpa o CPF para remover quaisquer caracteres não numéricos
  const cleanedCpf = client.cpf.replace(/[^\d]+/g, '');

  // Dados do cliente formatados
  const clientData = {
    name: client.name,
    email: client.email,
    phone: client.phone,
    document: cleanedCpf,
    documentType: 'CPF',
  };

 

  try {
    const response = await apiClient.post(
      '/gateway/pix/receive',
      {
        identifier,
        amount,
        client: clientData,
        callbackUrl,
        products: [
          {
            id: '3',
            name: 'Quiz C6Bank',
            price: amount,
            quantity: 1,
            description: 'Ajude-nós a construir produtos melhores para você',
          },
        ],
      },
      {
        headers: {
          'x-public-key': publicKey,
          'x-secret-key': secretKey,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar transação Pix:', error.response?.data || error.message);
    throw new Error(error.response?.data || 'Erro ao acessar a API');
  }
}
