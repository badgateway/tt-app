# ⏳ Unnamed Time Tracking APP ⌛️

A project to track work on projects for clients.

<br>

## 📦 Getting started

### Requirements Overview

The following are required to run this project:

- Node & NPM installed, package dependencies installed `npm i`.
- [Authenticated your local NPM with github packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token) for access to private Badgateway github packages.
- MySQL database set up and running.
- [Time tracking project API set up and running](https://github.com/badgateway/tt-api#readme).

<br>

### Gaining Access to Private Badgateway Github Packages

If `npm i` first gave you an error, you might need to get access to our Github
packages first.

Follow the steps here:

1. Go to your Github Settings > Developer Settings > Personal Access Tokens
2. Generate yourself a new one, give it read/write packages permissions. (save the PAT, cant be found again)
3. Navigate to your home directory, find or create a `.npmrc` file, add the following line
   `//npm.pkg.github.com/:_authToken=[your-recently-generated-PAT]`

Now when running 'npm i' the node modules will be downloaded.

<br>

### Setting Up The Database

Create a mysql database for this project. We're using "tt" as an identifier here often, shortform for "time tracking". Set the database user password `your_password` to your own appropriate password.
```
mysql> CREATE DATABASE tt;
mysql> CREATE USER 'tt' IDENTIFIED BY 'your_password';
mysql> GRANT SELECT, REFERENCES, INSERT, UPDATE, DELETE, ALTER, CREATE, DROP ON tt.* TO 'tt';
mysql> FLUSH PRIVILEGES;
```

<br>

Populate the database using knex, which should add tables automatically.<br>
```
knex --knexfile src/knexfile.ts migrate:latest
```

This should populate your database with the required tables.

<br>

## 👷 Development

### Running

From the root directory, initiate the project with `npm run start` (make sure the deps are installed).<br>
The API server can be browsed at http://localhost:8902/.

### File Structure

To keep all of our component files easy to browse and intuitive to find, this is the general file organization guide:
```
src
├── components
│   ├── reusable component
│   │   ├── (reusable component main)
│   │   └── (reusable component parts)
│   ├── (single reusable component)
│   └── (single reusable component)
├── pages
│   └── page //eg: 'people'
│       ├── sub-page //eg: 'new'
│       │   ├── (page component)
│       │   └── (page unique components)
│       ├── sub-page //eg: 'edit'
│       │   ├── (page component)
│       │   └── (page unique components)
│       ├── (main page component)
│       └── (main page unique components)
├── types
│   └── (reusable custom types)
├── utilities
│   └── (reusable utility functions/variables)
└── app.tsx
```
