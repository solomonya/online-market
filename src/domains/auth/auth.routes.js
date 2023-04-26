export async function authRoutes(fastify, options) {
  const { userModel } = options;

  fastify.get('/test/', async (request, reply) => {
    reply.status(200).send(await userModel.getUsers());
  })

  fastify.post('/authorize', async (request, reply) => {});

  fastify.post('/register/', async (request, reply) =>  {
    await userModel.createUser(request.body);
    reply.status(200).send({ success: true });
  })
}