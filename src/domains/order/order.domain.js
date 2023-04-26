import { OrderModel } from "./order.model.js";
import { OrderRepository } from "./order.repository.js";
import { orderRoutes } from "./order.routes.js";

function orderDomain(fastify, options, done) {
  const orderRepository = new OrderRepository(fastify);
  const orderModel = new OrderModel(orderRepository);
  fastify.register(orderRoutes, { prefix: "/orders", orderModel });

  done();
}

export { orderDomain };
