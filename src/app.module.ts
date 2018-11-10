import { Module } from '@nestjs/common';
import { ApiUsersController } from './controller/v1/api.users.controller';
import { ApiUsersService } from './service/v1/api.users.service';
import { GithubModule } from './module/github.module';
import { ConfigModule } from './module/config.module';

@Module({
  imports: [ConfigModule, GithubModule],
  controllers: [ApiUsersController],
  providers: [ApiUsersService],
})
export class AppModule {}
