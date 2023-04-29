export class OrderRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getOrdersByUser(params) {
    const { user_id } = params;
    const statement = "SELECT * FROM orders WHERE customer_id = $1";
    const { rows } = await this.db.query(statement, [user_id]);
    return rows;
  }

  async getOrderById(params) {
    const { order_id } = params;
    const statement = "SELECT * FROM orders WHERE order_id = $1";
    const { rows } = await this.db.query(statement, [order_id]);
    console.log(order_id);
    return rows[0];
  }

  async createNewOrder(params) {
    const { customer_id, region, totalAmount } = params;

    const statement =
      "INSERT INTO orders (location, customer_id, total) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await this.db.query(statement, [region, customer_id, totalAmount]);
    return rows[0];
  }

  async fillItems(items, order_id) {
    const items_placeholders = items
      .map(({ product_id, quantity }) => `(${product_id}, ${order_id}, ${quantity})`)
      .join(", ");
    const statement = `INSERT INTO items (product_id, order_id, quantity) VALUES ${items_placeholders};`;
    console.log("====================================");
    console.log("statement ", statement);
    console.log("====================================");
    await this.db.query(statement);
  }
}
