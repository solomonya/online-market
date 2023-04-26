import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { userRoutes } from "./user.routes.js";

function userDomain(fastify, _, done) {
  const userRepository = new UserRepository(fastify);
  const userModel = new UserModel(userRepository);
  fastify.decorate('userModel', userModel);
  fastify.register(userRoutes, { prefix: '/users', userModel });
  
  done();
}

export { userDomain };