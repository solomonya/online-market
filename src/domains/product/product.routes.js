export async function productRoutes(fastify, options) {
  const { productModel, queryBuilder } = options;

  fastify.get("/", async (request, reply) => {
    const products = await queryBuilder
      .from("get_products_with_providers")
      .execute();
    
      reply.status(200).send(products);
  });

  fastify.get("/:id", async (request, reply) => {
    const product = await productModel.getProduct(request.params);
    console.log(product);
    reply.status(200).send(product);
  });
}
