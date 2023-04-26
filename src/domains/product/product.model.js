export class ProductModel {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async getProducts() {
      return this.productRepository.getProducts();
    }
  
    async getProduct(props) {
      return this.productRepository.getProduct(props);
    }
  }