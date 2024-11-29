"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarDadosProdutor = buscarDadosProdutor;
const axios_1 = __importDefault(require("axios"));
const apiClient = axios_1.default.create({
    baseURL: 'https://app.blackpay.io/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
async function buscarDadosProdutor(publicKey, secretKey) {
    try {
        console.log('Iniciando requisição para /gateway/producer...');
        const response = await apiClient.get('/gateway/producer', {
            headers: {
                'x-public-key': publicKey,
                'x-secret-key': secretKey,
            },
        });
        console.log('Resposta da API:', response.data); // Log do retorno
        return response.data; // Retorna os dados do produtor
    }
    catch (error) {
        console.error('Erro ao buscar dados do produtor:', error.message);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
        }
        throw new Error(error.response?.data || 'Erro ao acessar a API');
    }
}
