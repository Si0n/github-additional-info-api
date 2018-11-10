const request = require("request-promise-native");

export class GithubService {
    public endpoint;

    public setEndpoint(endpoint: string): this {
        this.endpoint = endpoint;
        return this;
    }

    public getPath(path) {
        return `${this.endpoint}/${path}`;
    }

    public async getUser(userId) {
        return request.get(this.getPath(`users/${userId}`));
    }
}