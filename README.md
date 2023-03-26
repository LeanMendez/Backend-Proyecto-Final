<h1 align="center">FINAL PROJECT - CODERHOUSE BACKEND COURSE</h1><p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Project developed with <a href="http://nestjs.com" target="_blank">Nest.js</a></p><p align="center"><i>"a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications".</i></p>
    
  
## Description

This is the final project for CoderHouse Backend course. 

It's a Nest.js REST API that simulate the backend of a books ecommerce, with diferents entities, where you can register as user and generate a shopping order and manage your own cart with books. 

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
# DEPLOY



# ENDPOINTS

Endpoint list for the services provided

</br>

## AUTH with JWT


### POST `/auth/register`

**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `email`        | required | string  |  user email
| `password`        | required | string  |  user password
| `firstName` | required | string  |  user first name
| `lastName`        | required | string  |  user last name
| `role`       | required | 'user' or 'admin'  |  user role 

### POST `/auth/login`

**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `email`        | required | string  |  user email
| `password`        | required | string  |  user password

<br/>

## PRODUCTS

### GET `/productos`

### GET `/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | string  |  product's ID

### POST `/productos`
**Parameters in body**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
| `title`        | required | string  |  product's name
| `description` | required | string  |  product's description
| `category`        | required | string  |  product's category
| `photoURL`       | required | string  |  product's image
| `price`       | required | number  |  product's price
| `quantity`       | required | number  |  stock quantity 

### UPDATE `/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | string  |  updated product's ID
|     `{data}`  | optional |         |  update data

### DELETE `/productos/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | string  |  deleted product's ID

 <br/>

## CARTS

### GET `/cart`

### GET `/cart/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | string  |  cart's ID

### POST `/cart/`

**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `user`  | required | string  |  user mongo ID
|         `order`  | required | string  |  order mongo ID

### DELETE `/cart/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | string  |  deleted cart's ID

</br>

## ORDERS

### GET `/order`

### GET `/order/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | string  |  order's ID

### POST `/order/`

**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `user`  | required | string  |  user mongo ID
|         `products`  | required | Products['id']  |  Array de IDs de productos

### DELETE `/order/{id}`
**Parameters**
|          Name | Required |  Type   | Description 
| -------------:|:--------:|:-------:| --------------------------------|
|         `id`  | required | string  |  deleted order's ID