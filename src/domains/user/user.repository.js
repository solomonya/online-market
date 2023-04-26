const users = [{ name: 'Jhon Doe', email: "javascript@hater.com" }, { name: "n2749", email: "loveJavaSoMuch@gmail.com" }];

export class UserRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  getUsers() {
    return users;
  };
}