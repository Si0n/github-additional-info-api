import {Injectable} from '@nestjs/common';

@Injectable()
export class ApiUsersService {

    async createUser(githubUserId) {
        return `Command: create additional data for GitHub userID: ${githubUserId}`;
    }

    async getUser(githubUserId) {
        return `Command: read additional data for GitHub userID: ${githubUserId}`;
    }

    async updateUser(githubUserId) {
        return `Command: update additional data for GitHub userID: ${githubUserId}`;
    }

    async deleteUser(githubUserId) {
        return `Command: delete additional data for GitHub userID: ${githubUserId}`;
    }
}
