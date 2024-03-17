# Book Management System API

Welcome to the Book Management System API, a powerful solution for efficiently managing books, borrowing, and purchasing. This API provides administrators with comprehensive tools for book management while enabling users to seamlessly borrow, buy, and explore books.

## Features

- **Admin Privileges:** Administrators have full control over managing books within the system.
- **User Interactions:** Users can borrow books, buy books, and access the available library.

## Endpoints

- `/user/register`: Endpoint for user registration.
- `/user/login`: Endpoint for user authentication.
- `/user/logout`: Endpoint for user logout.
- `/book/add`: Endpoint for adding new books (admin access only).
- `/book/update/:id`: Endpoint for updating existing books (admin access only).
- `/book/delete/:id`: Endpoint for deleting books (admin access only).
- `/book/borrow/:id`: Endpoint for borrowing books.
- `/book/buy/:id`: Endpoint for purchasing books.
- `/book/`: Endpoint for accessing books in the library.

## Usage

1. **Register as a User:** Start by registering as a user to gain access to the library functionalities.
2. **Explore Available Books:** Browse through the library to discover the wide range of books available.
3. **Borrow or Buy Books:** Choose the desired book and opt to either borrow it or buy it, based on your preference and availability.
4. **Administrator Actions:** If you're an administrator, log in to access advanced features like adding, updating, or deleting books from the system.

## Technology Stack

- **Node.js:** Backend JavaScript runtime.
- **Express.js:** Web application framework for Node.js.
- **GraphQL:** Query language and runtime for APIs.
- **MongoDB:** NoSQL database for data storage.
- **Mongoose:** MongoDB object modeling tool for Node.js.

Enjoy seamless book management and access with the Book Management System API today!

