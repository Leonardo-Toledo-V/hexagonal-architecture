import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class GetAllUsersUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(): Promise<User[]| null> {
        return this.userRepository.list();
    }
}