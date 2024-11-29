import { Request, Response } from 'express';


const notificacoes: { id: string; status: string; createdAt: string }[] = [];


export function addNotificacao(notification: {
  id: string;
  status: string;
  createdAt: string;
}): void {
  const index = notificacoes.findIndex((n) => n.id === notification.id);

  if (index !== -1) {
    
    if (notificacoes[index].status !== notification.status) {
      notificacoes[index] = notification;
      console.log(`Transação ${notification.id} atualizada para status ${notification.status}`);
    }
  } else {
    
    notificacoes.push(notification);
    console.log(`Transação ${notification.id} adicionada com status ${notification.status}`);
  }

  
  removerNotificacoesAntigas();
}


function removerNotificacoesAntigas(): void {
  const agora = new Date().getTime();

  
  const notificacoesAtuais = notificacoes.filter((n) => {
    const createdAtTime = new Date(n.createdAt).getTime();
    return agora - createdAtTime <= 10 * 60 * 1000; 
  });

  
  if (notificacoesAtuais.length !== notificacoes.length) {
    console.log(
      `Removidas ${notificacoes.length - notificacoesAtuais.length} notificações antigas.`
    );
  }

  
  notificacoes.splice(0, notificacoes.length, ...notificacoesAtuais);
}


export async function consultarNotificacaoPorIdHandler(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> { 
  const { id } = req.params; 
  try {
    
    const notificacao = notificacoes.find((n) => n.id === id);

    
    if (!notificacao) {
      res.status(404).json({ error: 'Transação não encontrada' });
      return; 
    }

    
    res.status(200).json(notificacao);
  } catch (error: any) {
    console.error('Erro ao consultar notificação:', error.message);
    res.status(500).json({ error: 'Erro interno ao consultar a notificação' });
  }
}
