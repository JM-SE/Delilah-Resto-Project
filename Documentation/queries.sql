-- Drop Tables
DROP TABLE users;
DROP TABLE products;
DROP TABLE carts;
DROP TABLE cartItems;
DROP TABLE orders;
DROP TABLE orderItems;

-- Populate users table
INSERT INTO
  users
VALUES
  (
    NULL,
    "admin",
    "admin",
    "admin",
    "admin@delilah.com",
    000,
    "Delilah Street 99",
    1,
  );


-- Populate products table
INSERT INTO
  products
VALUES
  (
    NULL,
    "Veggie Sandwich",
    280,
    "VS",
    "sandveggie.jpg",
    "sandveggie.jpg",
  );

INSERT INTO
  products
VALUES
  (
    NULL,
    "Cheese Omelette",
    260,
    "CO",
    "omelettequeso.jpg",
    "omelettequeso.jpg",
  );

INSERT INTO
  products
VALUES
  (
    NULL,
    "Veggie Rolls",
    270,
    "VR",
    "rollsverdu.jpg",
    "rollsverdu.jpg",
  );

INSERT INTO
  products
VALUES
  (
    NULL,
    "Lemon Cookies",
    110,
    "LC",
    "lemoncookies.jpg",
    "lemoncookies.jpg",
  );

INSERT INTO
  products
VALUES
  (
    NULL,
    "Fruits Yoghurt",
    150,
    "YG",
    "yoghurt.jpg",
    "yoghurt.jpg",
  );

INSERT INTO
  products
VALUES
  (
    NULL,
    "Strawberries",
    80,
    "ST",
    "strawberries.jpg",
    "strawberries.jpg",
  );

INSERT INTO
  products
VALUES
  (
    NULL,
    "Coffee",
    60,
    "CF",
    "coffee.jpg",
    "coffee.jpg",
  );
