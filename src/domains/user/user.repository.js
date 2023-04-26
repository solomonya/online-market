const users = [{ name: 'Jhon Doe', email: "javascript@hater.com" }, { name: "n2749", email: "loveJavaSoMuch@gmail.com" }];

export class UserRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getUsers() {
    const statement = 'SELECT * FROM customers'
    const { rows } = await this.db.query(statement);
    return rows;
  };

  async createUser(props) {
    const { email, password } = props;
    console.log(email, password); 
  }
}