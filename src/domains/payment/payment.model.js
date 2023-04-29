class PaymentModel {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async createNewPayment(params) {
    console.log("CREATE NEW PAYMENT PARAMS -->", params);
    const { order_id, customer_id } = params;
    const total = await this.paymentRepository.getOrderTotal({ order_id });
    const balance = await this.paymentRepository.getUserBalance({ customer_id });

    console.log("TOTAL -->", total);

    if (balance < total) {
      throw new Error("Баланс недостаточен для совершения транзакции!");
    }

    await this.paymentRepository.createNewPayment({ order_id, total });
    await this.paymentRepository.updateUserBalance({ customer_id, newBalance: balance - total });

    return { success: true };
  }
}

export { PaymentModel };
