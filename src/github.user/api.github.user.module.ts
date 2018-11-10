import { Module } from '@nestjs/common';
import { ApiGithubUserController } from './api.github.user.controller';
import { ApiGithubUserService } from './api.github.user.service';
import { GithubModule } from './github.module';
import { ConfigModule } from './config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GithubUser } from './schema/github.user.schema';
import { GithubUserProviders } from './github.user.providers';
import { GithubUserService } from './github.user.service';
import { DatabaseModule } from '../database/database.module';

MongooseModule.forFeature([{ name: 'GithubUser', schema: GithubUser }])


@Module({
  imports: [ConfigModule, GithubModule, MongooseModule, DatabaseModule],
  controllers: [ApiGithubUserController],
  providers: [ApiGithubUserService, GithubUserService, ...GithubUserProviders],
})
export class ApiGithubUserModule {}
