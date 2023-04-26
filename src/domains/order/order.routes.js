export async function orderRoutes(fastify, options) {
    const { orderModel } = options;
    
    fastify.get("/:user_id", async (request, reply) => {
      const order = await orderModel.getOrdersByUser(request.params);
      console.log(order)
      reply.send(order);
    });
  }
  