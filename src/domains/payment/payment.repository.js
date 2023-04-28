class PaymentRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }
}

export { PaymentRepository };
