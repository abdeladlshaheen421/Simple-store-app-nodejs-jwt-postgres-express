API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.
---
API Endpoints

#products
    1. Index => http://localhost:3000/products [GET]
    2. Show  => http://localhost:3000/product/:id [GET]
    3. Create [token required]  => http://localhost:3000/products [POST]
    4. [OPTIONAL] Top 5 most popular products => http://localhost:3000/products/topfive [GET]
    5. [OPTIONAL] Products by category (args: product category) =>  http://localhost:3000/products/category/:id [GET]

#Users

    Index [token required] => http://localhost:3000/users [GET]
    Show [token required] => http://localhost:3000/users/:userId[GET]
    Create N[token required] => http://localhost:3000/users [POST]

#Orders

    Current Order by user (args: user id)[token required] => http://localhost:3000/orders
    [OPTIONAL] Completed Orders by user (args: user id)[token required] => http://localhost:3000/orders/completed

Data Shapes
##Product
### Column | Type
---
    * id | int
    * name | varchar
    * price | float
    * [OPTIONAL] category | varchar
---
##User
### Column | Type
---
    * id  | int
    * firstName | varchar
    * lastName | varchar
    * password | varchar
---
##Orders
### Column | Type
---
    * id | int
    * product_id   | int  (fk) for product table
    * quantity  | int 
    * user_id | int (fk) for users table
    * status | varchar
---
##order_products
### Column | Type
* id | int 
* product_id | int (fk)