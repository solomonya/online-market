import { authRoutes } from "./auth.routes.js";

function authDomain(fastify, options, done) {
  const { userModel } = options;
  fastify.register(authRoutes, { prefix: '/auth', userModel });
  done();
}

export { authDomain };