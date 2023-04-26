export class UserModel {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getUsers() {
    return this.userRepository.getUsers();
  }
}