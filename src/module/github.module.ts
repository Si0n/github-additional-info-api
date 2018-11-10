import {Module} from '@nestjs/common';
import {GithubService} from './../service/github.service';


@Module({
    providers: [
        {
            provide: GithubService,
            useValue: new GithubService(),
        },
    ],
    exports: [GithubService],
})
export class GithubModule {
}