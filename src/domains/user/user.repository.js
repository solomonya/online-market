export class UserRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getUsers() {
    const statement = 'SELECT * FROM customers'
    const { rows } = await this.db.query(statement);
    return rows;
  };

  async getUserByEmail(email) {
    const statement = 'SELECT * FROM customers WHERE customers.email=$1'
    const { rows } = await this.db.query(statement, [email]);
    return rows[0];
  }

  async createUser(props) {
    const { email, password } = props;
    const statement = 'INSERT INTO customers (email, password) VALUES ($1, $2)';
    await this.db.query(statement, [email, password]); 
  }
}