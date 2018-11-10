import {ConfigService} from './config.service';

export class AuthGuard {
    private apikey;
    private readonly errorCode = 'invalid_apikey';

    public setApikey(configService: ConfigService) {
        this.apikey = configService.get("ACCESS_TOKEN");
    }

    public checkApikey(apikey: string) {
        return this.prepareApikeyString(apikey)
            .then(apikey => this.isValid(apikey))
            .then(isAllowed => {
                if (!isAllowed) throw new Error(this.getErrorCode());
                return true;
            });
    }

    private async prepareApikeyString(apikey: string) {
        return apikey.replace(/basic /i, "");
    }

    private async isValid(apikey) {
        return this.apikey === apikey;
    }

    public getErrorCode() {
        return this.errorCode;
    }
}