export class OrderRepository {
    constructor(fastify) {
      this.db = fastify.pg;
    }

    async getOrdersByUser(params) {
        const { user_id } = params
        const statement = "SELECT * FROM orders WHERE customer_id = $1";
        const { rows } = await this.db.query(statement, [user_id]);
        return rows;
    }
}