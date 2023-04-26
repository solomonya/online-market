import { createUserSchema } from "./user.schema.js";

export async function userRoutes(fastify, options) {
  const { userModel } = options;

  fastify.get('/', async (request, reply) => {
    const users = await userModel.getUsers();
    reply.send(users);
  })

  fastify.post('/register/', { schema: createUserSchema }, async (request, reply) =>  {
    await userModel.createUser(request.body);
    reply.status(200).send({ success: true });
  })
}