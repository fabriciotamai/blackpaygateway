"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTransacao = buscarTransacao;
const axios_1 = __importDefault(require("axios"));
const apiClient = axios_1.default.create({
    baseURL: 'https://app.blackpay.io/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
async function buscarTransacao(transactionId, clientIdentifier, publicKey, secretKey) {
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
    }
    catch (error) {
        console.error('Erro ao buscar transação:', error.response?.data || error.message);
        throw new Error(error.response?.data || 'Erro ao acessar a API');
    }
}
