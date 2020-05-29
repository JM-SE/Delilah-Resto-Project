# **Delilah Resto**

#### Third project from the Full Stack Web Development bootcamp in Acámica.

The project goal was to create the back-end for a food delivery app, the architecture design, database, endpoints and documentation.

Front-end is included in the repository. It was intended to be analogous to a mobile app and is fully functional, but as it was not required for the approval of the project its just experimental. For best front-end example go to [gifOS](https://github.com/JM-SE/gifOS-Project) project.

## Instalation and Initialization

### _1. Clone Project_

Clone the repository from your terminal:

```
git clone https://github.com/JM-SE/Delilah-Resto-Project.git .`
```

Or download the repository and open the folder in your IDE.

### _2. Install the required dependencies_

In your terminal execute command:

```
npm install
```

### _3. Creating the database_

-   Open XAMPP and start Apache Web Server, ProFTDP and MySQL Database in port `3306`.
-   Open MySQL Workbench or any other tool for database architecture.
-   Connect Workbench to DB in host `localhost` with `username: root` and `password` should be empty.
-   Create database called `delilah`.
-   Execute command `npm run dev` in terminal to start the server. Sequelize automatically creates the required tables in the database.
-   Admin user is created automatically after the server is synchronized with the database. The default credentials for admin user are `username: admin` and `password: admin` this credentials can be changed in the front-end or by using Postman.
-   Populate products table by opening `Documentation/queries.sql` with Workbench, or copy and paste the queries inside the file. If you wish you can create your own products.

### _4. Starting the server_

If server not running already, in your terminal execute command:

```
npm start
```

If you want to edit files from the project execute command:

```
npm run dev
```

`And`

```
npm run watch:js
```

### _5. The app is ready to use_

The app is ready to be tested by importing the collection included (`Documentation/Delilah.postman_collection.json`) to _Postman_ or in your web browser by entering the [front-end](http://localhost:5000/).

_If *Postman* is used `Dev:Delilah` enviroment must be selected._

## Future Implementations

-   Deployment
-   Better error handling
-   Security
    -   Rate limiting
    -   Security HTTP Headers
    -   Data sanitization
    -   Parameter pollution prevention
-   Payments
-   Forgotten password reset functionality

## API Documentation

Open `Documentation/Delilah-Resto-API-Documentation.yaml` with any text editor, JSON viewer or in [Swagger](https://editor.swagger.io/) by importing the file in the File tab.

A list of the available endpoints and methods will be listed with the necessary information to use the API.

## Used technologies & resources:

-   Node.js
-   Express
-   MySQL
-   Sequelize ORM
-   Json Web Token
-   Pug template engine
-   Parcel
-   XAMPP
-   MySQL Workbench
-   Postman
-   Swagger
