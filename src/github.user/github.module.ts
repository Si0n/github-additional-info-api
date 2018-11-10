import {Module} from '@nestjs/common';
import {GithubService} from './github.service';


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