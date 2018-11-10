import { Module } from '@nestjs/common';
import { ApiGithubUserModule } from './github.user/api.github.user.module';

@Module({
  imports: [ApiGithubUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
