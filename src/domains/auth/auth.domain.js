import { authRoutes } from "./auth.routes.js";

function authDomain(fastify, options, done) {
  fastify.register(authRoutes, { prefix: '/auth' });
  done();
}

export { authDomain };