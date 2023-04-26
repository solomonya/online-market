import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { userRoutes } from "./user.routes.js";

export async function userDomain(fastify) {
  const userRepository = new UserRepository(fastify);
  const userModel = new UserModel(userRepository);

  fastify.register(userRoutes, { prefix: '/users', userModel });
}