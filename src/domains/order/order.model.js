export class OrderModel {
    constructor(orderRepository) {
      this.orderRepository = orderRepository;
    }
  
    async getOrdersByUser(props) {
      return this.orderRepository.getOrdersByUser(props);
    }
  }