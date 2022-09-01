# Storefront Backend Project

Storefront is an the backend for online shoping.  
This requires me to architect the database, tables, and columns to fulfill the requirements, create a RESTful API to be accessible to the frontend developer, with tested writen and secure user information with encryption, and provide tokens for integration into the frontend.

<strong>Note:</strong> This project is project two from the Udacity full stack nano dgree program.

## Table of contents

- [Overview](#overview)

  - [Folder Structure](#folder-strcture)
  - [setup](#setup)

- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)

## Overview

Users should be able to:

- do all CRUD operations for all existing data shaps
- request some dashboard services that execute some special queries to datbase

### Folder Strcture

```
├───images
├───migrations
│   └───sqls
├───spec
│   └───support
└───src
    ├───helpers
    ├───middleware
    │   └───tests
    ├───models
    │   └───tests
    ├───routes
    │   └───api
    │       ├───order
    │       │   ├───handlers
    │       │   └───tests
    │       ├───product
    │       │   ├───handlers
    │       │   └───tests
    │       ├───services
    │       │   ├───handlers
    │       │   └───tests
    │       └───user
    │           ├───handlers
    │           └───tests
    ├───services
    │   └───tests
    └───utilities
        └───tests
```

### Setup:

<strong>Stop✋:</strong> Before setup you need to take a look to [REQUIREMENTS](REQUIREMENTS.md) file that has the env file content that you need to create before setup the app

- you have to install all dependencies from:

```
npm install
```

- To build the project run:

```
npm run build
```

- To run the migrations(creating all tables):

```
npm run migrate
```

- For testing run:

```
npm run test
```

<strong>Note:</strong> If faluire happend within testing just run the blow script before testing again, that will reset the database for you.

```
npm run reset
```

- To start the server you run:

  This will build the project before start

```
npm run start
```

- Or you can run:

  This will run the server directly

```
node ./build/server.js
```

## My process

### Built with

- Postgres for the database
- Node.js
- Express.js
- Typescript
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- Unit test with Jasmine
- Formatting with Prettier and Eslint

## Author

- Linkedin : [@ibrahim-ahmed-a8bba9196](https://www.linkedin.com/in/ibrahim-ahmed-a8bba9196/)
- Facebook : [@ibrahim11ahmed](https://www.facebook.com/ibrahim11ahmed/)
- LeetCode : [@ibrahim11ahmed](https://leetcode.com/ibrahim11elian/)
- Frontend Mentor - [@ibrahim11elian](https://www.frontendmentor.io/profile/ibrahim11elian)
