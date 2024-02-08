import { UserRepository } from "../domain/repositories/UserRepository";

export class DeleteUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}