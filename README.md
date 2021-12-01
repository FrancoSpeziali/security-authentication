# Issuing JWT Tokens

This assignment will have you building a backend service which allows the user to register and login to an application, and issue JWT tokens to logged-in users

> Difficulty level: Intermediate 🥸🏁

## Keywords

`express`, `mongoose`, `schemas`, `registration`, `login`, `user`, `bcrypt`, `jsonwebtoken`, `jwt`

## What you will be doing

For this assignment you will have to:

1. Complete the schema and add the database connections
2. Add the specified routes
3. Write a register endpoint which allows the user to create a new account
4. Write a login endpoint which compares the login details, and issues a JWT token if the user has correctly logged in

The client (frontend) code has mostly been written, but you may wish to style it

This project assumes you've already had experience with:

- Express.js
- dotenv
- Mongoose / MongoDB

## Folder Structure

This repository contains the `client` (frontend) as a subfolder

When you run your node server, it will automatically handle requests to serve the `/client` pages. You can view it in
the browser under the URL `http://localhost:3001/`

**There is no need to serve the client separately**

## Getting Started

1. run `npm run setup`
2. run `npm run build`

> Make some tea, this may take a while
> You only need to run these commands once

## Usage

1. run `nodemon server.js` or `node server.js` (if you do not have nodemon installed)

##### 🔥 IMPORTANT! Changing the frontend

If you want to change the client, you must rebuild the static client files

1. run `npm run build`

## Tasks

For these tasks, you are expected to write your code in the file `server.js`

## Task 1 - Setting up the .env file

1. Using the `.env.example` file as a template, create a `.env` file
2. Add your database connection details to your `.env` file
3. The key `DB_NAME` points to the name of the database you want to connect to. Choose a name for your database.
4. For the other keys, fill in the details as provided to you by your MongoDB service.
5. The key `DB_HOST` is the domain of the MongoDB service you will connect to

## Task 2 - Connecting your server to your database

1. Using the `mongoose.connect()` method, setup the connection to your server inside `server.js`
2. `mongoose.connect()` returns a promise
   - use the `then()` method to display a message saying the connection was successful
   - use the `catch()` method to display a message saying the connection failed
3. Check that your database can connect

> Here is an example of you how might setup your connection string,
> once you have destructured the properties from `process.env`

> `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

## Task 3 - Preparing our server to receive requests

In the next tasks, we will create a REST API so that clients can register and login on our server. To do this, we must first begin with a few steps:

1. Install the npm package `cors`
2. Import and add `cors` to your middleware stack. This will prevent the dreaded same origin policy error in your browser.

   > Remember to run your middleware before any of your routes!

3. Run `express.json()` as middleware. This will allow any JSON sent for example, with a POST request, to be correctly read by the server.

## Task 4 - Creating a schema, model for the user

You will be writing a schema for the user

Consider the following user data:

```text
username: tamales_calientitos
firstname: Tamales
lastname: Calientitos
email: tamales_calientitos@comida.com
hash: edc745d2c395a2183a5080c3c0c34fde
registerDate: 1638367246138
```

1. Write a Mongoose schema which correctly reflects this data
2. Create and export a model for the schema
3. For the field `registerDate`, use the function `Date.now` as the default value

## Task 5 - Create a route

We will create a route for all our `user` related actions

1. Create a `user` router which will handle all requests to the path `/user`

## Task 6 - Creating an endpoint - usernameAvailable

We do not want users to be able to register with a username which has already been used, so we would like the allow the client (frontend) to make a request to _check_ if a username is available.

For this endpoint, we can assume the client will send the `username` as a request parameter

1. Create an endpoint with the path `/usernameAvailable` in your `user` router. This will be a `GET` endpoint. Set up your endpoint so that it receives a `username` parameter.
2. Import and use the model you created in **Task 4**
3. Search the `User` model for the parameter. If a user is **not found**, send a `200` response to the client, otherwise send a `404` response.

## Task 7 - Creating an endpoint - register

We will create an endpoint which will record new details for the user.

We will receive the new user details via the JSON body from the **request** object.

1. Create an endpoint with the path `/register` in your `user` router. This will be a `POST` endpoint.
2. Import and use the `bcrypt` library to create a hash from the password of the user, which should come as the property `password` from the **request body**.
3. Import and use the model you created in **Task 4**
4. Use the model to create the user details, with the hash of the password you created in **Part 2**
5. Send an appropriate response to the client, if the user document was successfully generated
6. Send an appropriate error response (and status code) to the client, if the user document was **not** successfully generated

## Task 8 - Protecting the database from invalid user registrations

We will add some guards to our endpoint, because there are situations where we will not want the user to be able to create an account. For example;

- If the username is already taken
- If the email has already been used

In the `/register` endpoint;

1. Modify your code logic so that **before** you create the new account, you first search for the **email** address. If the email already exists, abort the operation and send an appropriate error to the user.
2. Modify your code logic so that **before** you create the new account, you first search for the **username**. If the username already exists, abort the operation and send an appropriate error to the user.

## Task 9 - Creating a JWT issuer function

We would like to generate JWT tokens for all logged in users.

To help organise our code better, we will do this in a separate file and folder.

1. Install the `jsonwebtoken` npm package with `npm i jsonwebtoken`
2. Create a `utils` folder in the root of your project
3. Create the file `jwtIssuer.js`
4. Import the `jsonwebtoken` library
5. Now write a function which;
   - Receives a user document (object) as an argument
   - Signs and returns a JWT token with the `jsonwebtoken` library
6. Import the function into your `user` router

## Task 10 - Creating an endpoint - login

For this endpoint, we can assume the client will send their **username** and their **password** as part of the **request body**

1. Create an endpoint with the path `/login` in your `user` router. This will be a `POST` endpoint.
2. Find the user by their username from the model you created in **Task 4**
3. Use the `bcrypt.compare()` method to check that the supplied password, when hashed, matches the hashed password in the database
4. If the result of this is `true`, use the `jwtIssuer` function to generate a new token for the user, and send this token to the client
5. If the result of the compare function is `false`, send an appropriate error (and status code) to the client 

# Bonus Tasks

## Bonus Task 1 - Connecting the frontend to backend

So far, for all of these tasks, you could have used an API testing tool (such as Insomnia or Postman) to test them.

However, you can use the already supplied frontend code

In the `/client` folder;

1. Install `axios`

## Bonus Task 2 - Register.js

1. Import `axios` into the `Register.js` component
2. Replace the `fetch` request with `axios.post()`, adding:
   - the url for the backend `/register` endpoint
   - the form `data` object

## Bonus Task 3  - Login.js

1. Import `axios` into the `Login.js` component
2. Replace the `fetch` request with `axios.post()`, adding:
   - the url for the backend `/login` endpoint 
   - the form `data` object

## Bonus Task 4 - check if username is available

1. In the `Register.js` component, check if the username is available by sending a request to the `/usernameAvailable` endpoint

> Hint: You may want to use the `onChange` event on the relevant `<input>` field