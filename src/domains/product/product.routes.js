export async function productRoutes(fastify, options) {
  const { productModel } = options;

  fastify.get("/", async (request, reply) => {
    const products = await productModel.getProducts();
    reply.send(products);
  });

  fastify.get("/:id", async (request, reply) => {
    const product = await productModel.getProduct(request.params);
    console.log(product);
    reply.send(product);
  });
}
