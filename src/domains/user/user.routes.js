import { checkAuth } from "../../middleware/checkAuth.js";

export async function userRoutes(fastify, options) {
  const { userModel } = options;

  fastify.get('/', { preValidation: [checkAuth] }, async (request, reply) => {
    const users = await userModel.getUsers();
    console.log(request.token)
    reply.send(users);
  })
}