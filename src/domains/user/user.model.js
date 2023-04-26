export class UserModel {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async createUser(props) {
    await this.userRepository.createUser(props);
  }
}