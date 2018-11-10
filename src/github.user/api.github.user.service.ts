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
        return this.authGuard.checkApikey(apikey)
            .then(() => this.GithubUserService.findOne(githubUserId))
            .then(exist => {
                if (exist) throw new Error("User already created!");
            })
            .then(() => this.GithubService.getUser(githubUserId))
            .then(() => newUser)
            .then(newUser => this.GithubUserService.create(newUser))
            .then(() => {
                return {
                    success: true
                }
            })
            .catch(e => {
                if (e.message === this.authGuard.getErrorCode()) {
                    return {
                        success: true
                    }
                }
                return {
                    success: false,
                    message: e.message || "Some error occurred"
                }
            });
    }

    async getUser(githubUserId: string, withRepo: number, apikey: string) {
        let userInfo = withRepo == 1 ? {description: '', githubUserInfo: {}, repositories: []} : {
            description: '',
            githubUserInfo: {}
        };
        return this.GithubService.getUser(githubUserId)
            .then(user => {
                if (!user) throw new Error("User not found on Github");
                return (userInfo.githubUserInfo = user);
            })
            .then(() => {
                if (withRepo == 1) return this.GithubService.getUserRepositories(githubUserId)
                return null;
            })
            .then(repositories => {
                if (repositories != null) return (userInfo.repositories = repositories)
                return;
            })
            .then(() => this.authGuard.checkApikey(apikey))
            .then(() => this.GithubUserService.findOne(githubUserId))
            .then(userDocument => {
                if (!userDocument) throw new Error("User not found in database");
                return userDocument.toObject();
            })
            .then(databaseUser => {
                return (userInfo.description = databaseUser.description);
            })
            .then(() => {
                return userInfo;
            })
            .catch(e => {
                if (e.message === this.authGuard.getErrorCode()) {
                    return userInfo; //returning only data obtained from github, coz its in free access anyways. Preventing from obtain description field
                }
                return {
                    success: false,
                    message: e.hasOwnProperty("error") && e.error.hasOwnProperty("message") ? e.error.message : (e.message || "Some error occurred")
                }
            });
    }

    async updateUser(githubUserId, description, apikey: string) {
        return this.authGuard.checkApikey(apikey)
            .then(() => this.GithubUserService.findOne(githubUserId))
            .then(user => {
                if (!user) throw new Error("User not found");
                user.description = description;
                return user.save();
            })
            .then(() => {
                return {
                    success: true
                }
            })
            .catch(e => {
                if (e.message === this.authGuard.getErrorCode()) {
                    return {
                        success: true
                    }
                }
                return {
                    success: false,
                    message: e.message || "Some error occurred"
                }
            });
    }

    async deleteUser(githubUserId, apikey: string) {
        return this.authGuard.checkApikey(apikey)
            .then(() => this.GithubUserService.findOne(githubUserId))
            .then(databaseUser => {
                if (!databaseUser) throw new Error("User not exists");
                return databaseUser.remove();
            })
            .then(() => {
                return {success: true}
            })
            .catch(e => {
                if (e.message === this.authGuard.getErrorCode()) {
                    return {
                        success: true
                    }
                }
                return {
                    success: false,
                    message: e.message || "Some error occurred"
                }
            });
    }
}
