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

  async createNewOrder(params) {
    const { customer_id, region, totalAmount } = params;

    const statement = "INSERT INTO orders (location, customer_id, total) VALUES ($1, $2, $3) RETURNING *";
    const { rows } = await this.db.query(statement, [region, customer_id, totalAmount]);
    return rows[0];
  }
}
