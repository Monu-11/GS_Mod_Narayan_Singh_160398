# Next.js Project

## Overview

This is a **Next.js** project that uses **MongoDB** as the database and **NextAuth.js** for authentication. It follows best practices, including code formatting with **Prettier**.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Yarn](https://yarnpkg.com/) (Package manager)
- MongoDB (Local or cloud-based instance, e.g., MongoDB Atlas)

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGODB_URI=<your_mongodb_connection_string>
NEXTAUTH_SECRET=<your_nextauth_secret>
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Installation

Clone the repository and install dependencies using Yarn:

```sh
git clone <repository-url>
cd <project-directory>
yarn install
```

## Running the Development Server

Start the Next.js development server:

```sh
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Code Formatting

This project uses **Prettier** for consistent code formatting. To format code, run:

```sh
yarn prettier --write .
```

To check formatting without applying changes:

```sh
yarn prettier --check .
```

## Building for Production

To create a production build, run:

```sh
yarn build
```

Then start the production server:

```sh
yarn start
```

## License

This project is licensed under the MIT License.
