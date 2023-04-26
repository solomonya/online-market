import fastifyPlugin from "fastify-plugin";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { userRoutes } from "./user.routes.js";
import { authDomain } from "../auth/auth.domain.js";

function userPlugin(fastify, options, done) {
  const userRepository = new UserRepository(fastify);
  const userModel = new UserModel(userRepository);
  
  fastify.decorate('userModel', userModel);
  fastify.register(userRoutes, { prefix: '/users', userModel });
  fastify.register(authDomain, { userModel });
  
  done();
}

const userDomain = fastifyPlugin(userPlugin);

export { userDomain };