export async function userRoutes(fastify, options) {
  const { userModel } = options;

  fastify.get('/', async (request, reply) => {
    const users = userModel.getUsers();
    reply.send(users);
  })
}