export async function productRoutes(fastify, options) {
  const { productModel } = options;

  fastify.get("/", async (request, reply) => {
    const products = await productModel.getProducts({ queryParams: request.query });

    reply.status(200).send(products);
  });

  fastify.get("/:id", async (request, reply) => {
    const product = await productModel.getProduct(request.params);
    reply.status(200).send(product);
  });
}
