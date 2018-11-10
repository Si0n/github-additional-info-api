## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
### Overview
###### Configs
Check out src/config/main.env (if exists) or just 
```bash 
cp src/config/main.env.dist src/config/main.env
```
And fill empty keys in main.env
##### Authorization
To pass service authorization you should provide token as a header authorization basic token: 
```bash 
Authorization: Basic {{token}}
```

```http request
GET /api/users/:userName - Get User Info with description
GET /api/users/:userName?repo=1 - Get User Info with description and repositories info
```
```http request
POST /api/users/:userName with Post Params : {description: "some string description} - will create a database record for given user
```
```http request
PUT /api/users/:userName with Post Params : {description: "some string description} - will update a database record for given user
```
```http request
DELETE /api/users/:userName - will delete from DB user if exists
```