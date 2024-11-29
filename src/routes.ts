import { Router } from 'express';
import { buscarProdutoHandler } from './http/controllers/buscarProdutoHandler'; // Corrigido

import { criarTransacaoHandler } from './http/controllers/criarTransactionHandler';
import { consultarNotificacaoPorIdHandler } from './http/controllers/onloadStatusTransaction';
import { receberNotificacaoHandler } from './http/controllers/receiveNotification';

const router = Router();

// Definir rotas
router.post('/transactions/pix', criarTransacaoHandler);
router.get('/producer', buscarProdutoHandler);
router.post('/transactions/pix/callback', receberNotificacaoHandler);
router.get('/getstatustransaction/:id', consultarNotificacaoPorIdHandler);


export default router;