import {Injectable} from '@nestjs/common';
import {ConfigService} from "./config.service";
import {GithubService} from "./github.service";
import {GithubUserService} from "./github.user.service";
import {GithubUserInterface} from "./interface/github.user.interface";
import {AuthGuard} from './auth.guard';

@Injectable()
export class ApiGithubUserService {
    constructor(
        private readonly ConfigService: ConfigService,
        private readonly GithubService: GithubService,
        private readonly GithubUserService: GithubUserService,
        private readonly authGuard: AuthGuard
    ) {
        this.GithubService.setEndpoint(this.ConfigService.get("GITHUB_API_ENDPOINT"));
        this.authGuard.setApikey(this.ConfigService);
    }

    async createUser(githubUserId: string, description: string, apikey: string) {
        let newUser: GithubUserInterface = {githubId: githubUserId, description: description};
        try {
            if (await this.GithubUserService.findOne(githubUserId)) throw new Error("User already created!");
            if (await this.GithubService.getUser(githubUserId)) {
                if (await this.authGuard.checkApikey(apikey)) {
                    await this.GithubUserService.create(newUser);
                }
                return {
                    success: true
                }
            } else throw new Error("Github user not found!");
        } catch (e) {
            return {
                success: false,
                message: e.message || "Some error occurred"
            }
        }
    }

    async getUser(githubUserId: string, withRepo: number, apikey: string) {
        try {
            let githubUser, description, githubUserRepositories;

            githubUser = await this.GithubService.getUser(githubUserId);
            if (!githubUser) throw new Error("Github user not found!");

            if (withRepo == 1) {
                githubUserRepositories = await this.GithubService.getUserRepositories(githubUserId);
            }

            if (await this.authGuard.checkApikey(apikey)) {
                let userDocument = await this.GithubUserService.findOne(githubUserId);
                if (userDocument) userDocument = userDocument.toObject();
                if (userDocument && userDocument.hasOwnProperty("description")) {
                    description = userDocument.description;
                }
            }
            if (!description)  description = "";
            return {description: description, ...githubUser, repositories: githubUserRepositories};
        } catch (e) {
            return {
                success: false,
                message: e.hasOwnProperty("error") && e.error.hasOwnProperty("message") ? e.error.message : (e.message || "Some error occurred")
            }
        }
    }

    async updateUser(githubUserId, description, apikey: string) {
        try {
            if (await this.authGuard.checkApikey(apikey)) {
                let userDocument = await this.GithubUserService.findOne(githubUserId);
                if (!userDocument) throw new Error("User not found");
                userDocument.description = description;
                await userDocument.save()
            }
            return {success: true};
        } catch (e) {
            return {
                success: false,
                message: e.message || "Some error occurred"
            }
        }
    }

    async deleteUser(githubUserId, apikey: string) {
        try {
            if (await this.authGuard.checkApikey(apikey)) {
                let userDocument = await this.GithubUserService.findOne(githubUserId);
                if (!userDocument) throw new Error("User not found");
                await userDocument.remove()
            }
            return {success: true};
        } catch (e) {
            return {
                success: false,
                message: e.message || "Some error occurred"
            }
        }
    }
}
