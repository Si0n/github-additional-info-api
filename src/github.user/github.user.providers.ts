import { Connection } from 'mongoose';
import { GithubUser } from './schema/github.user.schema';

export const GithubUserProviders = [
    {
        provide: 'GithubUserToken',
        useFactory: (connection: Connection) => connection.model('GithubUser', GithubUser),
        inject: ['DbConnectionToken'],
    },
];