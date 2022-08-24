# Storefront Backend Project

## Table of contents

- [API Endpoints](#api-endpoints)

  - [Users](#users)
  - [Products](#products)
  - [Orders](#orders)
  - [Order Product](#order-product)

- [Database ERD](#database-erd)

- [Data Shapes](#data-shapes)
  - [Users Table](#users-1)
  - [Products Table](#products-1)
  - [Orders Table](#orders-1)
  - [Order Product Table](#order-product-1)
- [My .env file](#my-env-file)

## API Endpoints

#### Users

- Create
  - route: `/user` - method: POST
  - body:
  ```json
  {
    "user_name": "ahmed123",
    "first_name": "mooo",
    "last_name": "salah",
    "password_digest": "1234rfds"
  }
  ```
  - success response: Token
  - faild response:
  ```json
  {
    "msg": "mohamed already exist"
  }
  ```
- Index [token required]
  - route: `/user` - method: GET
  - success response:
  ```json
  [
    {
      "id": 1,
      "user_name": "ibrahim_elian",
      "first_name": "ibrahim",
      "last_name": "ahmed"
    },
    {
      "id": 2,
      "user_name": "eid10",
      "first_name": "eid",
      "last_name": "said"
    }
  ]
  ```
  - faild response:
  ```json
  { "msg": `can't get users` }
  ```
- Show [token required]
  - route: `/user/:userName` - method: GET
  - success response:
  ```json
  {
    "user": {
      "id": 1,
      "user_name": "ibrahim_elian",
      "first_name": "ibrahim",
      "last_name": "ahmed"
    },
    "recent_purchases": [
      {
        "user_name": "ibrahim_elian",
        "order_id": "10",
        "order_status": "complete"
      },
      {
        "user_name": "ibrahim_elian",
        "order_id": "9",
        "order_status": "complete"
      },
      {
        "user_name": "ibrahim_elian",
        "order_id": "8",
        "order_status": "complete"
      },
      {
        "user_name": "ibrahim_elian",
        "order_id": "7",
        "order_status": "complete"
      },
      {
        "user_name": "ibrahim_elian",
        "order_id": "6",
        "order_status": "complete"
      }
    ]
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find user (samir)"
  }
  ```
- Update [user token required]
  - route: `/user/:userName` - method: PUT
  - body:
  ```json
  {
    "firstName": "mooo",
    "lastName": "salah"
  }
  ```
  - success response:
  ```json
  {
    "msg": "eid10 data updated",
    "user": {
      "id": 2,
      "user_name": "eid10",
      "first_name": "samir",
      "last_name": "eid"
    }
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find user (ahmed)"
  }
  ```
- Delete [user token required]
  - route: `/user/:userName` - method: DELETE
  - success response:
  ```json
  {
    "msg": "user deleted with user name: mohameda"
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find user (mohamed10)"
  }
  ```

#### Products

- Create [token required]
  - route: `/product` - method: POST
  - body:
  ```json
  {
    "p_name": "phone",
    "p_price": 342,
    "p_category": "electronics"
  }
  ```
  - success response:
  ```json
  {
    "msg": "product created",
    "product": {
      "id": "46",
      "p_name": "phone",
      "p_price": 1200,
      "p_category": "electronics"
    }
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't create pruduct"
  }
  ```
- Index
  - route: `/product` - method: GET
  - success response:
  ```json
  [
    {
      "id": "1",
      "p_name": "Courtenay",
      "p_price": 691,
      "p_category": "typescript"
    },
    {
      "id": "2",
      "p_name": "Nanni",
      "p_price": 236,
      "p_category": "html"
    },
    {
      "id": "3",
      "p_name": "Kelsey",
      "p_price": 647,
      "p_category": "c"
    }
  ]
  ```
  - faild response:
  ```json
  { "msg": `can't get products` }
  ```
- Show
  - route: `/product/:productID` - method: GET
  - success response:
  ```json
  {
    "id": "15",
    "p_name": "table",
    "p_price": 1707,
    "p_category": "c"
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find product with ID (123)"
  }
  ```
- Update [token required]
  - route: `/product/:productID` - method: PUT
  - body:
  ```json
  {
    "p_name": "table",
    "p_price": 1234,
    "p_category": "c"
  }
  ```
  - success response:
  ```json
  {
    "msg": "Judas data updated",
    "product": {
      "id": "12",
      "p_name": "Judas",
      "p_price": 80,
      "p_category": "c"
    }
  }
  ```
  - faild response:
  ```json
  {
    "msg": "product with ID (134) doesn't exist"
  }
  ```
- Delete [token required]
  - route: `/product/:productID` - method: DELETE
  - success response:
  ```json
  {
    "msg": "product deleted with ID: 29"
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find product with ID (245)"
  }
  ```
- Top 5 most popular products
  - route: `/products/popular` - method: GET
  - success response:
  ```json
  [
    {
      "product_name": "Nathanael",
      "quantity_ordered": "343"
    },
    {
      "product_name": "Eadie",
      "quantity_ordered": "210"
    },
    {
      "product_name": "Kelsey",
      "quantity_ordered": "192"
    },
    {
      "product_name": "Laurette",
      "quantity_ordered": "186"
    },
    {
      "product_name": "Judas",
      "quantity_ordered": "185"
    }
  ]
  ```
  - faild response:
  ```json
  { "msg": `there is no popular products` }
  ```
- Products by category

  - route: `/products/:category` - method: GET
  - success response:

  ```json
  [
    {
      "id": "3",
      "p_name": "Kelsey",
      "p_price": 647,
      "p_category": "c"
    },
    {
      "id": "5",
      "p_name": "Kaitlynn",
      "p_price": 24,
      "p_category": "c"
    }
  ]
  ```

  - faild response:

  ```json
  {
    "msg": "can't find products in category (svgd)"
  }
  ```

#### Orders

- Create [user token required]
  - route: `/user/:userName/order` - method: POST
  - body:
  ```json
  {
    "status": "active" or "complete"
  }
  ```
  - success response:
  ```json
  {
    "msg": "order created",
    "order": {
      "id": "42",
      "user_name": "ibrahim_elian",
      "o_status": "active"
    }
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't create order"
  }
  ```
- Index [token required]
  - route: `/order` - method: GET
  - success response:
  ```json
  [
    {
      "id": "1",
      "user_name": "ibrahim_elian",
      "o_status": "active"
    },
    {
      "id": "2",
      "user_name": "ibrahim_elian",
      "o_status": "active"
    },
    {
      "id": "3",
      "user_name": "ibrahim_elian",
      "o_status": "active"
    }
  ]
  ```
  - faild response:
  ```json
  { "msg": `can't get orders` }
  ```
- Show
  - route: `/order/:orderID` - method: GET
  - success response:
  ```json
  {
    "id": "1",
    "user_name": "ibrahim_elian",
    "o_status": "active"
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find order with ID (24345)"
  }
  ```
- Update [user token required]
  - route: `/user/:userName/order/:orderID` - method: PUT
  - body:
  ```json
  {
    "status": "active" or "complete",
  }
  ```
  - success response:
  ```json
  {
    "msg": "order 5 status updated",
    "order": {
      "id": "5",
      "user_name": "ibrahim_elian",
      "o_status": "active"
    }
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't update order",
    "error": "the status must be active or complete"
  }
  or
  {
    "msg": "can't find order for user (ibrahim_elian) with ID (23)"
  }
  ```
- Delete [user token required]
  - route: `/user/:userName/order/:orderID` - method: DELETE
  - success response:
  ```json
  {
    "msg": "order deleted with ID: 29"
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find order with ID (245)"
  }
  ```

#### Order Product

- Add order product [user token required]

  - route: `/user/:userName/order/product` - method: POST
  - body:

  ```json
  {
    "orderID": 1,
    "productID": 12,
    "quantity": 4
  }
  ```

  - success response:

  ```json
  {
    "msg": "product with ID (12) added to order with ID (1)  for user: ibrahim_elian",
    "result": {
      "id": "82",
      "o_id": "1",
      "p_id": "12",
      "quantity": "5"
    }
  }
  ```

  - faild response:

  ```json
  {
    "msg": "can't add product to order may be product doesn't exist"
  }
  or
  {
    "msg": "there is no order with ID (23) for user ibrahim_elian"
  }
  ```

- all products in all orders [token required]
  - route: `/order/product/all` - method: GET
  - success response:
  ```json
  [
    {
      "id": "1",
      "o_id": "9",
      "p_id": "6",
      "quantity": "78"
    },
    {
      "id": "2",
      "o_id": "11",
      "p_id": "5",
      "quantity": "55"
    },
    {
      "id": "3",
      "o_id": "13",
      "p_id": "12",
      "quantity": "68"
    }
  ]
  ```
  - faild response:
  ```json
  { "msg": `can't get data` }
  ```
- product in order [token required]
  - route: `/order/product/:ID` - method: GET
  - success response:
  ```json
  {
    "id": "28",
    "o_id": "15",
    "p_id": "15",
    "quantity": "62"
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find order product with ID (87)"
  }
  ```
- Update produt quantity in order [user token required]
  - route: `/user/:userName/order/product/:ID` - method: PUT
  - body:
  ```json
  {
    "quantity": 14
  }
  ```
  - success response:
  ```json
  {
    "msg": "order product quantity updated",
    "order": {
      "id": "28",
      "o_id": "15",
      "p_id": "15",
      "quantity": "7"
    }
  }
  ```
  - faild response:
  ```json
  {
    "msg": "can't find order product with ID (245)"
  }
  ```
- Delete product in order [user token required]

  - route: `/user/:userName/order/product/:ID` - method: DELETE
  - success response:

  ```json
  {
    "msg": "product in order deleted with ID: 28"
  }
  ```

  - faild response:

  ```json
  {
    "msg": "can't find order product with ID (280)"
  }
  ```

- Current Order by user [token required]
  - route: `/user/:userName/order/active` - method: GET
  - success response:
  ```json
  [
    {
      "user_name": "ibrahim_elian",
      "order_id": "42",
      "order_status": "active"
    }
  ]
  ```
  - faild response:
  ```json
  {
    "msg": `there is no active orders for user (ibrahim_elian)`
  }
  ```
- Completed Orders by user [token required]
  - route: `/user/:userName/order/completed` - method: GET
  - success response:
  ```json
  [
    {
      "user_name": "ibrahim_elian",
      "order_id": "6",
      "order_status": "complete"
    },
    {
      "user_name": "ibrahim_elian",
      "order_id": "7",
      "order_status": "complete"
    },
    {
      "user_name": "ibrahim_elian",
      "order_id": "8",
      "order_status": "complete"
    }
  ]
  ```
  - faild response:
  ```json
  {
    "msg": `there is no completed orders for user (ibrahim_elian)`
  }
  ```

## Database ERD

- ERD sceenshot
  ![ERD](./images/ERD.pgerd.png 'resize')

## Data Shapes

#### Users

```sql
CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	user_name VARCHAR(50) NOT NULL UNIQUE,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	password_digest VARCHAR(200) NOT NULL
);
```

#### Products

```sql
CREATE TABLE products (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	p_name VARCHAR(60) NOT NULL UNIQUE,
	p_price INT NOT NULL,
	p_category VARCHAR(60) NOT NULL
);
```

#### Orders

```sql
CREATE TABLE orders (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	user_name VARCHAR(50) NOT NULL REFERENCES users(user_name),
	o_status VARCHAR(50) NOT NULL
);
```

#### Order Product

```sql
CREATE TABLE order_product (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	o_id BIGINT NOT NULL REFERENCES orders(id),
	p_id BIGINT NOT NULL REFERENCES products(id),
	quantity BIGINT NOT NULL
);
```

## My .env file

```javascript
PORT=3000

# enviroment variables for database connection

PG_HOST='localhost'
PG_USER='postgres'
PG_DATABASE='store_db'
PG_TEST_DATABASE="store_db_test"
PG_PASSWORD=16854
PG_PORT=5432
NODE_ENV="DEV"

# for hashing passwords

SALT_ROUNDS=10

# for jwt

TOKEN_SECRET='dsl73kg345j465al5kgjdljieowuoi'
```
