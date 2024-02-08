import { UserRepository } from "../domain/repositories/UserRepository";

export class ActivationUseCase {
    constructor(readonly userRepository: UserRepository) {}

    async execute(uuid:string): Promise<void> {
        await this.userRepository.activate(uuid);
    }
}