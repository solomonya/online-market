// ESM
import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';

const fastify = Fastify({
  logger: true
})

//TODO: NEED TO RESET PASS
fastify.register(fastifyPostgres, {
  connectionString: ""
});

fastify.get('/', async (request, reply) => {
  try {
    const results = await fastify.pg.query('SELECT * from orders');
    reply.send(results);
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
start()