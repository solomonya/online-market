import { PaymentModel, PaymentRepository } from "../payment/index.js";
import { ProductModel, ProductRepository } from "../product/index.js";
import { OrderModel } from "./order.model.js";
import { OrderRepository } from "./order.repository.js";
import { orderRoutes } from "./order.routes.js";

function orderDomain(fastify, _, done) {
  const paymentRepository = new PaymentRepository(fastify);
  const paymentModel = new PaymentModel(paymentRepository);

  const productRepository = new ProductRepository(fastify);
  const productModel = new ProductModel(productRepository);

  const orderRepository = new OrderRepository(fastify);

  const orderModel = new OrderModel(orderRepository, paymentModel, productModel);

  fastify.register(orderRoutes, { prefix: "/orders", orderModel });

  done();
}

export { orderDomain };
