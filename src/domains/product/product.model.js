export class ProductModel {
  constructor(productRepository, queryBuilder) {
    this.productRepository = productRepository;
    this.queryBuilder = queryBuilder;
  }

  async getProducts({ queryParams }) {
    const {
      min_price,
      max_price,
      provider_name,
      product_name,
      order,
      order_dir,
      query_limit,
      page,
    } = queryParams;

    const limit = query_limit ?? 10;
    const offset = page ? page * limit : 0;

    const statement = this.queryBuilder
      .from("get_products_with_providers")
      .where([
        min_price ? `price >= ${min_price}` : null,
        max_price ? `price <= ${max_price}` : null,
        provider_name ? `provider_name like '%${provider_name}%'` : null,
        product_name ? `name like '%${product_name}%'` : null,
      ])
      .orderBy(order ? order : null, order_dir ?? "ASC")
      .setLimit(limit ?? 10)
      .setOffset(offset);

    const products = await statement.execute();

    const productsCount = await this.productRepository.getProductsCount();

    return {
      count: productsCount.count,
      results: products,
    };
  }

  async getProduct(props) {
    return this.productRepository.getProduct(props);
  }

  async getProductsByIds(ids) {
    const products = await this.productRepository.getByIds(ids);
    return products;
  }
}
