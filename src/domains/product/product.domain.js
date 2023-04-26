import { ProductModel } from "./product.model.js";
import { ProductRepository } from "./product.repositoty.js";
import { productRoutes } from "./product.routes.js";

function productDomain(fastify, _, done) {
  const productRepository = new ProductRepository(fastify);
  const productModel = new ProductModel(productRepository);
  fastify.register(productRoutes, { prefix: "/products", productModel });
  done();
}

export { productDomain };
