const request = require("request-promise-native");

export class GithubService {
    public endpoint;

    public setEndpoint(endpoint: string): this {
        this.endpoint = endpoint;
        return this;
    }

    private getRequest(url: string, requestOptions: object) {
        requestOptions = requestOptions || {};
        let options = {
            "url": url,
            "headers": {
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
            },
            "json": true
        }
        options = {...options, ...requestOptions};
        return request(options);
    }

    public getPath(path: string) {
        return `${this.endpoint}/${path}`;
    }

    public async getUser(userId: string) {
        return this.getRequest(this.getPath(`users/${userId}`), {method: "get"});
    }

    public async getUserRepositories(userId: string) {
        return this.getRequest(this.getPath(`users/${userId}/repos`), {method: "get"});
    }
}