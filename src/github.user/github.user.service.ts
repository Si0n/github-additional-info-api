import {Model} from 'mongoose';
import {Injectable, Inject} from '@nestjs/common';
import {GithubUserInterface} from './interface/github.user.interface';
import {CreateGithubUserDto} from './dto/create.github.user.dto';

@Injectable()
export class GithubUserService {
    constructor(@Inject('GithubUserToken') private readonly githubUser: Model<GithubUserInterface>) {
    }

    async create(createGithubUserDto: CreateGithubUserDto): Promise<GithubUserInterface> {
        const createdGithubUser = new this.githubUser(createGithubUserDto);
        return await createdGithubUser.save();
    }

    async findOne(GithubId) {
        return await this.githubUser.findOne({githubId: GithubId}).exec();
    }

    async findAll(): Promise<GithubUserInterface[]> {
        return await this.githubUser.find().exec();
    }
}