import Fastify from "fastify";
import fastifyPostgres from "@fastify/postgres";
import * as dotenv from "dotenv";
dotenv.config();

import { userDomain } from "./domains/user/index.js";
import { productDomain } from "./domains/product/product.domain.js";
import { generateToken } from "./utils/jwt.js";
import { paymentDomain } from "./domains/payment/payment.domain.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyPostgres, {
  connectionString: process.env.DB_URL,
});

fastify.decorate("generateToken", generateToken);

fastify.register(userDomain);
fastify.register(productDomain);
fastify.register(paymentDomain);

fastify.get("/", async (request, reply) => {
  try {
    reply.send({ online_market: "api" });
  } catch (e) {
    reply.send(e);
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
