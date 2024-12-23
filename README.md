## Description

This project is an e-commerce application that allows users to browse products, add them to cart, and process payments using Wompi. It implements a Single Page Application (SPA) using React and Redux on the frontend and uses Node.js and NestJS on the backend, following the hexagonal architecture to ensure the scalability and maintainability of the system.

## Key Features

* Product Display: Displays available products with options to add to cart.
* Cart Management: Users can modify quantities or remove products from the cart.
* Payment Processing: Integration with Wompi to process payments securely (PENDING).
* Hexagonal Architecture: Backend implementation that separates business logic from infrastructure adaptations.

## Technologies Used

- Frontend: React, Redux, TypeScript
- Backend: Node.js, NestJS
- Database: DynamoDB
- Payment: Wompi (PENDING)


## Installation

```bash
$ git clone https://github.com/Carl0sL0pez03/app-product-api
$ cd app-product-api
$ npm install
```
###  Test variables are uploaded for a user with only temporary DynamoDB permissions for 1 week.

## Execution

To start the server and the client:

```bash
$ npm run start
```

## Code Structure

* /src: Contains the frontend source code.
* /server: Contains the backend source code.
* /config: Project configurations.

## Integration with Wompi
#### Details on how transactions and validations are handled:

Transaction Creation: A transaction is created with Wompi each time a user proceeds to payment (Pending).
Card Validation: Use of custom hooks to validate credit card information before sending it to Wompi.
