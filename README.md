# Book Management System API

Welcome to the Book Management System API, a powerful solution for efficiently managing books, borrowing, and purchasing. This API provides administrators with comprehensive tools for book management while enabling users to seamlessly borrow, buy, and explore books.

## Features

- **Admin Privileges:** Administrators have full control over managing books within the system.
- **User Interactions:** Users can borrow books, buy books, and access the available library.

## Endpoints
  # GraphQL Routes Documentation

## Introduction

This document provides an overview of the GraphQL routes available in the Book Management System application. GraphQL is a query language for APIs that enables clients to request only the data they need, allowing for more efficient and flexible data retrieval.

## Getting Started

To interact with the GraphQL API, you can use tools like Postman or GraphQL Playground. The GraphQL endpoint is located at `/graphql`. Ensure that the server is running before making requests to the GraphQL API.

## Authentication

Some GraphQL routes require authentication. You need to include an `Authorization` header with a valid access token to access these routes. The access token should be obtained by logging in using the `loginUser` mutation.

## Available Routes

### Queries

1. **getUsers**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Retrieves a list of all users.
   - Authorization: Required (Admin access)
   - Example Query:
     ```graphql
     query {
       getUsers {
         _id
         name
         email
         city
         age
         role
       }
     }
     ```

2. **getBooks**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Retrieves a list of all books.
   - Authorization: Required (Admin or Reader access)
   - Example Query:
     ```graphql
     query {
       getBooks {
         _id
         title
         genre
         author
         published_year
       }
     }
     ```

3. **getUser**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Retrieves a specific user by ID.
   - Authorization: Required (Admin access)
   - Example Query:
     ```graphql
     query {
       getUser(id: "user_id_here") {
         _id
         name
         email
         city
         age
         role
       }
     }
     ```

4. **getBook**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Retrieves a specific book by ID.
   - Authorization: Required (Admin or Reader access)
   - Example Query:
     ```graphql
     query {
       getBook(id: "book_id_here") {
         _id
         title
         genre
         author
         published_year
       }
     }
     ```

### Mutations

1. **registerUser**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Registers a new user.
   - Authorization: Not required
   - Example Mutation:
     ```graphql
     mutation {
       registerUser(name: "John Doe", email: "john@example.com", pass: "password", role: "reader") {
         _id
         name
         email
         role
       }
     }
     ```

2. **loginUser**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Logs in a user and generates access tokens.
   - Authorization: Not required
   - Example Mutation:
     ```graphql
     mutation {
       loginUser(email: "john@example.com", pass: "password") {
         access_token
         refresh_token
       }
     }
     ```

3. **logoutUser**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Logs out a user by blacklisting access tokens.
   - Authorization: Required
   - Example Mutation:
     ```graphql
     mutation {
       logoutUser {
         msg
       }
     }
     ```

4. **addBook**
   - Endpoint: `/graphql`
   - Method: `POST`
   - Description: Adds a new book to the system.
   - Authorization: Required (Admin or Librarian access)
   - Example Mutation:
     ```graphql
     mutation {
       addBook(title: "Book Title", genre: "Fantasy", author: "Author Name", published_year: 2022) {
         _id
         title
         genre
         author
         published_year
       }
     }
     ```

## Conclusion

This concludes the documentation for the GraphQL routes in the Book Management System application. Refer to this document for information on available queries and mutations, as well as authentication requirements for each route.




# Node.js EndPoints


### `/user/register`

- **Method:** POST
- **Description:** Endpoint for user registration.
- **Input:** JSON object containing user details such as name, email, password, city, and age.
- **Output:** JSON response indicating the success or failure of the registration process, along with any relevant error messages.

### `/user/login`

- **Method:** POST
- **Description:** Endpoint for user authentication.
- **Input:** JSON object containing user email and password.
- **Output:** JSON response containing authentication tokens (access token and refresh token) upon successful login, along with any relevant error messages in case of failure.

### `/user/logout`

- **Method:** GET
- **Description:** Endpoint for user logout.
- **Input:** HTTP headers containing the access token.
- **Output:** JSON response confirming the logout process.

### `/book/add`

- **Method:** POST
- **Description:** Endpoint for adding new books (admin access only).
- **Input:** JSON object containing book details such as title, genre, author, and published year.
- **Output:** JSON response indicating the success or failure of the book addition process, along with any relevant error messages.

### `/book/update/:id`

- **Method:** PATCH
- **Description:** Endpoint for updating existing books (admin access only).
- **Input:** JSON object containing the updated book details.
- **Output:** JSON response confirming the successful update of the book, along with any relevant error messages.

### `/book/delete/:id`

- **Method:** DELETE
- **Description:** Endpoint for deleting books (admin access only).
- **Input:** Path parameter specifying the ID of the book to be deleted.
- **Output:** JSON response confirming the successful deletion of the book, along with any relevant error messages.

### `/book/borrow/:id`

- **Method:** POST
- **Description:** Endpoint for borrowing books.
- **Input:** Path parameter specifying the ID of the book to be borrowed.
- **Output:** JSON response confirming the successful borrowing of the book, along with any relevant error messages.

### `/book/buy/:id`

- **Method:** POST
- **Description:** Endpoint for purchasing books.
- **Input:** Path parameter specifying the ID of the book to be purchased.
- **Output:** JSON response confirming the successful purchase of the book, along with any relevant error messages.

### `/book/`

- **Method:** GET
- **Description:** Endpoint for accessing books in the library.
- **Input:** None
- **Output:** JSON response containing a list of books available in the library, along with any relevant error messages.

## Usage

1. **Register as a User:** Start by registering as a user to gain access to the library functionalities.
2. **Explore Available Books:** Browse through the library to discover the wide range of books available.
3. **Borrow or Buy Books:** Choose the desired book and opt to either borrow it or buy it, based on your preference and availability.
4. **Administrator Actions:** If you're an administrator, log in to access advanced features like adding, updating, or deleting books from the system.

## Postman Documentation

For detailed information on the API endpoints and how to interact with them, refer to the [Postman Documentation](https://documenter.getpostman.com/view/31970826/2sA2xnxpYD).

## Technology Stack

- **Node.js:** Backend JavaScript runtime.
- **Express.js:** Web application framework for Node.js.
- **GraphQL:** Query language and runtime for APIs.
- **MongoDB:** NoSQL database for data storage.
- **Mongoose:** MongoDB object modeling tool for Node.js.

Enjoy seamless book management and access with the Book Management System API today!

