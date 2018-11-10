import * as mongoose from 'mongoose';

export const GithubUser = new mongoose.Schema({
    githubId: { type : String , unique : true, required : true },
    description: { type : String , required : true },
});