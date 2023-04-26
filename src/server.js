// ESM
import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import { userDomain } from './domains/user/index.js';

const fastify = Fastify({
  logger: true
})

//TODO: NEED TO RESET PASS
fastify.register(fastifyPostgres, {
  connectionString: ""
});

fastify.register(userDomain);

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