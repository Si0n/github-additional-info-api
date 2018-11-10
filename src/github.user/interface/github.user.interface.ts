import { Document } from 'mongoose';

export interface GithubUserInterface extends Document {
    readonly githubId: string;
    readonly description: string;
}