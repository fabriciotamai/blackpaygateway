"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receberNotificacaoHandler = receberNotificacaoHandler;
async function receberNotificacaoHandler(req, res) {
    try {
        const notification = req.body;
        console.log('Notificação recebida:', notification);
        const { transactionId, status } = notification.transaction;
        console.log(`Status da transação ${transactionId}: ${status}`);
        res.status(200).send('Notificação recebida e processada com sucesso');
    }
    catch (error) {
        console.error('Erro ao processar notificação da BlackPay:', error.message);
        res.status(500).json({ error: error.message });
    }
}
