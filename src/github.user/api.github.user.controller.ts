import {Get, Post, Put, Delete, Body, Query, Param, Controller} from '@nestjs/common';
import {ApiGithubUserService} from './api.github.user.service';

@Controller("api/v1/users/")
export class ApiGithubUserController {
    constructor(private readonly service: ApiGithubUserService) {
    }

    @Post(":githubUserId")
    create(@Param("githubUserId") githubUserId: string, @Body("description") description: string) {
        return this.service.createUser(githubUserId, description);
    }

    @Get(":githubUserId")
    read(@Param("githubUserId") githubUserId, @Query('repo') withRepo : number = 0) {
        return this.service.getUser(githubUserId, withRepo);
    }

    @Put(":githubUserId")
    update(@Param("githubUserId") githubUserId, @Body('description') description: string) {
        return this.service.updateUser(githubUserId, description);
    }

    @Delete(":githubUserId")
    delete(@Param("githubUserId") githubUserId) {
        return this.service.deleteUser(githubUserId);
    }
}
