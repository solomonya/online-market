export class ProductRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getProducts() {
    const statement = "SELECT * FROM get_products_with_providers";
    const { rows } = await this.db.query(statement);
    return rows;
  }

  async getProduct(params) {
    const { id } = params;
    const statement = "SELECT * FROM products WHERE product_id = $1";
    const { rows } = await this.db.query(statement, [id]);
    return rows;
  }

  async getByIds(ids) {
    const statement = "SELECT * FROM products WHERE product_id = ANY($1::int[])";
    const { rows } = await this.db.query(statement, [ids]);
    return rows;
  }
}
