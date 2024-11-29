import Redis from 'ioredis';

import dotenv from 'dotenv';
dotenv.config();

// Configurar o cliente Redis usando as variáveis de ambiente
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  tls: {}, // Habilita a conexão segura
});

// Eventos para monitorar a conexão
redis.on('connect', () => {
  console.log('Conectado ao Redis com sucesso.');
});

redis.on('error', (err) => {
  console.error('Erro na conexão com o Redis:', err);
});

export default redis;
