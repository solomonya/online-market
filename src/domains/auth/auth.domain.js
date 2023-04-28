import { AuthModel } from "./auth.model.js";
import { authRoutes } from "./auth.routes.js";

function authDomain(fastify, options, done) {
  const { userModel } = options;
  const authModel = new AuthModel();
  fastify.register(authRoutes, { prefix: "/auth", userModel, authModel });
  done();
}

export { authDomain };
