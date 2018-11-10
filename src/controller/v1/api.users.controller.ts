import {Get, Post, Put, Delete, Param, Controller} from '@nestjs/common';
import {ApiUsersService} from './../../service/v1/api.users.service';

@Controller("api/v1/users/")
export class ApiUsersController {
    constructor(private readonly service: ApiUsersService) {}

    @Post(":githubUserId")
    create(@Param("githubUserId") githubUserId) {
        return this.service.createUser(githubUserId);
    }

    @Get(":githubUserId")
    read(@Param("githubUserId") githubUserId) {
        return this.service.getUser(githubUserId);
    }

    @Put(":githubUserId")
    update(@Param("githubUserId") githubUserId) {
        return this.service.updateUser(githubUserId);
    }

    @Delete(":githubUserId")
    delete(@Param("githubUserId") githubUserId) {
        return this.service.deleteUser(githubUserId);
    }
}
