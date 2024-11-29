import { Request, Response } from 'express';
import { criarTransacaoPix } from '../../api/criarTransação';

export async function criarTransacaoHandler(req: Request, res: Response): Promise<void> {
  try {
    const { client } = req.body;

    // console.log(client);

    
    if (!client?.name || !client?.email || !client?.phone || !client?.cpf) {
      res.status(400).json({ error: 'Campos obrigatórios estão faltando' });
      return;
    }

    // console.log('Iniciando criação de transação Pix...');
    const transacao = await criarTransacaoPix(
      client,
      process.env.PUBLIC_KEY || '',
      process.env.SECRET_KEY || ''
    );

    // console.log('Transação criada com sucesso:', transacao);
    res.status(201).json(transacao);  
  } catch (error: any) {
    console.error('Erro ao criar transação Pix:', error.message);
    res.status(500).json({ error: error.message });
  }
}
