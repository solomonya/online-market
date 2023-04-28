export class OrderModel {
    constructor(orderRepository) {
      this.orderRepository = orderRepository;
    }
  
    async getOrdersByUser(props) {
      return this.orderRepository.getOrdersByUser(props);
    }

    async createNewOrder(props) {
      const { customer_id, items } = props;
      const order = { 
        orderId: Math.random() * 100, 
        customer_id, 
        dateOfShipping: new Date().toDateString(),
        total: 200 
      };
      return order;
    }
  }