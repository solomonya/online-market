import { checkAuth } from "../../middleware/checkAuth.js";

async function paymentRoutes(fastify, options) {
  const { paymentModel } = options;

  fastify.post("/pay/", { preValidation: [checkAuth] }, async (request, reply) => {
    reply.status(200).send({ payment: true });
  });
}

export { paymentRoutes };
