export async function productRoutes(fastify, options) {
  const { productModel, queryBuilder } = options;

  fastify.get("/", async (request, reply) => {
    const { min_price, max_price, provider_name, product_name, order, order_dir } = request.query;

    await queryBuilder.from("get_products_with_providers");
    if (min_price !== undefined) queryBuilder.where(`price >= ${min_price}`);
    if (max_price !== undefined) queryBuilder.where(`price <= ${max_price}`);
    if (provider_name !== undefined) queryBuilder.where(`provider_name like '%${provider_name}%'`);
    if (product_name !== undefined) queryBuilder.where(`name like '%${product_name}%'`);

    if (order !== undefined) queryBuilder.orderBy(order, order_dir);

    console.log("wheres", queryBuilder.whereConditions);
    console.log("orders", queryBuilder.orderByFields);
    const products = await queryBuilder.execute();
    queryBuilder.reset();
    reply.status(200).send(products);
  });

  fastify.get("/:id", async (request, reply) => {
    const product = await productModel.getProduct(request.params);
    console.log(product);
    reply.status(200).send(product);
  });
}
