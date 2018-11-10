import {Module} from '@nestjs/common';
import {ConfigService} from './../service/config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`${__dirname}/../../config/main.env`),
        }
    ],
    exports: [ConfigService],
})
export class ConfigModule {
}