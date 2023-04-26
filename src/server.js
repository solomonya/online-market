// ESM
import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import { userDomain } from './domains/user/index.js';
import { authDomain } from './domains/auth/auth.domain.js';

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyPostgres, {
  connectionString: "postgresql://postgres:AiDaNuRbOlAt2&$3@db.xzcvlfryrnbfyqpvgymp.supabase.co:5432/postgres"
});

fastify.register(userDomain);
fastify.register(authDomain, { userModel: fastify.userModel });

fastify.get('/', async (request, reply) => {
  try {
    reply.send({ hello: 'world' });
  } catch(e) {
    reply.send(e);
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();