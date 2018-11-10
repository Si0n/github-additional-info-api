import {Injectable} from '@nestjs/common';
import {ConfigService} from "../config.service";
import {GithubService} from "../github.service";

@Injectable()
export class ApiUsersService {
    constructor(private readonly ConfigService: ConfigService, private readonly GithubService: GithubService) {
        this.GithubService.setEndpoint(this.ConfigService.get("GITHUB_API_ENDPOINT"));
    }

    async createUser(githubUserId) {
        return this.GithubService.getUser(githubUserId)
            .then(user => {
                return user;
            })
            .catch(err =>  err);
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
