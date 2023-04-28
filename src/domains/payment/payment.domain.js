import { orderDomain } from "../order/order.domain.js";

import { PaymentModel } from "./payment.model.js";
import { PaymentRepository } from "./payment.repository.js";
import { paymentRoutes } from "./payment.routes.js";

function paymentDomain(fastify, _, done) {
  const paymentRepository = new PaymentRepository(fastify);
  const paymentModel = new PaymentModel(paymentRepository);

  fastify.register(paymentRoutes, { prefix: "/payments", paymentModel });
  fastify.register(orderDomain, { paymentModel });
  done();
}

export { paymentDomain };
