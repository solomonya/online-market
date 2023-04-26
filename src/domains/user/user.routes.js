import { createUserSchema } from "./user.schema.js";

export async function userRoutes(fastify, options) {
  const { userModel } = options;

  fastify.get('/', async (request, reply) => {
    const users = await userModel.getUsers();
    reply.send(users);
  })
}