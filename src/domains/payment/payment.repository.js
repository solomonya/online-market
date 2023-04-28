class PaymentRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async createNewPayment(params) {
    const { order_id, total } = params;

    const statement = "INSERT INTO payments (order_id, total) VALUES ($1, $2);";

    console.log("INSERT PAYMENT -->", statement);
    await this.db.query(statement, [order_id, total]);
  }

  async updateUserBalance(params) {
    const { customer_id, newBalance } = params;
    const statement = "UPDATE customers SET balance = $1 WHERE customer_id = $2;";
    await this.db.query(statement, [newBalance, customer_id]);
  }

  async getOrderTotal(params) {
    const { order_id } = params;
    const statement = "SELECT total FROM orders where order_id = $1";
    const { rows } = await this.db.query(statement, [order_id]);
    const total = parseFloat(rows[0].total);
    return total;
  }

  async getUserBalance(params) {
    const { customer_id } = params;
    const statement = "SELECT balance FROM customers WHERE customer_id = $1";
    const { rows } = await this.db.query(statement, [customer_id]);
    const balance = parseFloat(rows[0].balance);
    return balance;
  }
}

export { PaymentRepository };
