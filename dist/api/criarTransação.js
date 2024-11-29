"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarTransacaoPix = criarTransacaoPix;
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const apiClient = axios_1.default.create({
    baseURL: 'https://app.blackpay.io/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
async function criarTransacaoPix(client, publicKey, secretKey) {
    const identifier = (0, uuid_1.v4)();
    const amount = 19.9;
    const callbackUrl = 'https://c118-2001-1284-f502-2ce4-6c19-7b2b-22d5-7d86.ngrok-free.app/api/transactions/pix/callback';
    const cleanedCpf = client.cpf.replace(/[^\d]+/g, '');
    const clientData = {
        name: client.name,
        email: client.email,
        phone: client.phone,
        document: cleanedCpf,
        documentType: 'CPF',
    };
    try {
        const response = await apiClient.post('/gateway/pix/receive', {
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
        }, {
            headers: {
                'x-public-key': publicKey,
                'x-secret-key': secretKey,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Erro ao criar transação Pix:', error.response?.data || error.message);
        throw new Error(error.response?.data || 'Erro ao acessar a API');
    }
}
