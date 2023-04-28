import { checkAuth } from "../../middleware/checkAuth.js";

async function paymentRoutes(fastify, options) {
  const { paymentModel } = options;

  fastify.post("/pay/:id", { preValidation: [checkAuth] }, async (request, reply) => {
    const { id } = request.params;
    console.log("ORDER ID -->", request.params);
    const { balance, customer_id } = request.token;
    
    try {
      const result = await paymentModel.createNewPayment({
        order_id: id,
        balance: parseFloat(balance),
        customer_id
      });

      reply.status(200).send(result);
    } catch(e) {
      reply.status(400).send({ message: e.message });
    }
  });
}

export { paymentRoutes };
