import {Get, Post, Put, Delete, Headers, Body, Query, Param, Controller} from '@nestjs/common';
import {ApiGithubUserService} from './api.github.user.service';

@Controller("api/users/")
export class ApiGithubUserController {
    constructor(private readonly service: ApiGithubUserService) {
    }

    @Post(":githubUserId")
    create(@Param("githubUserId") githubUserId: string, @Body("description") description: string, @Headers("authorization") apikey: string = "") {
        return this.service.createUser(githubUserId, description, apikey);
    }

    @Get(":githubUserId")
    read(@Param("githubUserId") githubUserId, @Query('repo') withRepo: number = 0, @Headers("authorization") apikey: string = "") {
        return this.service.getUser(githubUserId, withRepo, apikey);
    }

    @Put(":githubUserId")
    update(@Param("githubUserId") githubUserId, @Body('description') description: string, @Headers("authorization") apikey: string = "") {
        return this.service.updateUser(githubUserId, description, apikey);
    }

    @Delete(":githubUserId")
    delete(@Param("githubUserId") githubUserId, @Headers("authorization") apikey: string = "") {
        return this.service.deleteUser(githubUserId, apikey);
    }
}
