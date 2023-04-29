import { checkAuth } from "../../middleware/checkAuth.js";

export async function orderRoutes(fastify, options) {
  const { orderModel } = options;

  fastify.get("/", { preValidation: [checkAuth] }, async (request, reply) => {
    const { customer_id } = request.token;
    const order = await orderModel.getOrdersByUser({ user_id: customer_id });
    console.log(order);
    reply.send(order);
  });

  fastify.get("/:id", { preValidation: [checkAuth] }, async (request, reply) => {
    const { id } = request.params;
    const order = await orderModel.getOrderById({ order_id: id });
    reply.send(order);
  });

  fastify.post("/", { preValidation: [checkAuth] }, async (request, reply) => {
    const { customer_id, region } = request.token;
    const { items } = request.body;
    const createdOrder = await orderModel.createNewOrder({ customer_id, items, region });
    reply.status(200).send({ createdOrder });
  });
}
