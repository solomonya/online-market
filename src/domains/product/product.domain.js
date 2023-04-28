import { QueryBuilder } from "../../utils/queryBuilder.js";
import { ProductModel } from "./product.model.js";
import { ProductRepository } from "./product.repositoty.js";
import { productRoutes } from "./product.routes.js";

function productDomain(fastify, _, done) {
  const queryBuilder = new QueryBuilder(fastify.pg);
  const productRepository = new ProductRepository(fastify);
  const productModel = new ProductModel(productRepository);

  fastify.register(productRoutes, { prefix: "/products", productModel, queryBuilder });
  done();
}

export { productDomain };
