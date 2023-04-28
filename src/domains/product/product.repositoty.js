export class ProductRepository {
  constructor(fastify) {
    this.db = fastify.pg;
    this.supabase = fastify.supabase;
    this.fs = fastify.fs;
  }

  async getProducts() {
    const statement = "SELECT * FROM get_products_with_providers";
    const { rows } = await this.db.query(statement);
    return rows;
  }

  async getProduct(params) {
    const { id } = params;

    const filePath = `static/images/products/${id}.jpg`;
    const { data, error } = await this.supabase.storage.from("images").download("public/1.jpg");
    const buffer = Buffer.from(await data.arrayBuffer());
    await this.fs.promises.writeFile(filePath, buffer);

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
