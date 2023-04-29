export class OrderModel {
  constructor(orderRepository, paymentModel, productModel) {
    this.orderRepository = orderRepository;
    this.paymentModel = paymentModel;
    this.productModel = productModel;
  }

  async getOrdersByUser(props) {
    return this.orderRepository.getOrdersByUser(props);
  }

  async getOrderById(props) {
    return this.orderRepository.getOrderById(props);
  }

  async createNewOrder(props) {
    const { items } = props;
    const totalPrice = await this.#calculateTotal(items);

    const created_order = await this.orderRepository.createNewOrder({
      ...props,
      totalAmount: totalPrice,
    });
    await this.orderRepository.fillItems(items, created_order.order_id);
    return created_order;
  }

  #calculateTotal = async (items) => {
    const productsIds = items.map(({ product_id }) => product_id);
    const products = await this.productModel.getProductsByIds(productsIds);

    const productsQuantityDict = Object.fromEntries(
      items.map(({ product_id, quantity }) => [product_id, quantity])
    );

    const calculatedTotalPrice = products.reduce((acc, product) => {
      const quantity = productsQuantityDict[product.product_id];
      acc += quantity * parseFloat(product.price);
      return acc;
    }, 0);

    return calculatedTotalPrice;
  };
}
