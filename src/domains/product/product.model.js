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

  async getProductsByIds(ids) {
    const products = await this.productRepository.getByIds(ids);
    return products;
  }
}
