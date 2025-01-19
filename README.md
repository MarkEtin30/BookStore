# Bookstore Application

A modern bookstore application built with ASP.NET for the backend and React for the frontend. This application allows users to browse books by category, manage orders, and perform checkout actions. It also includes features like user authentication, order history, cart management, and book categorization.

## Technologies Used

- **Frontend:** React, JavaScript/TypeScript, HTML, CSS, Bootstrap
- **Backend:** ASP.NET Core Web API
- **Database:** SQL Server
- **Authentication:** JWT (JSON Web Token)
- **Routing:** React Router

## Features

- **User Authentication:** Sign up, login, and user authentication using JWT tokens.
- **Book Management:** Users can view, search, filter, and browse books by categories.
- **Categories Management:** Books are categorized into different genres (e.g., Fiction, Non-fiction, Science, etc.).
- **Cart Management:** Add books to the cart, update quantities, and checkout.
- **Order History:** Users can view their past orders.
- **Responsive Design:** Fully responsive design using Bootstrap.

## Setup Instructions

### 1. Backend Setup (ASP.NET Core)

#### Prerequisites
- [.NET SDK](https://dotnet.microsoft.com/download) (version 6.0 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (or SQL Server Express for local development)

#### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/bookstore.git
    cd bookstore
    ```

2. Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```

3. Restore NuGet packages:
    ```bash
    dotnet restore
    ```

4. Create the database and apply migrations:
    ```bash
    dotnet ef database update
    ```

5. Run the ASP.NET backend:
    ```bash
    dotnet run
    ```
    The API will be available at `http://localhost:5000`.

### 2. Frontend Setup (React)

#### Prerequisites
- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/)

#### Steps
1. Navigate to the `Frontend` directory:
    ```bash
    cd ../Frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `Frontend` folder with the following content:
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. Run the React application:
    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.

### 3. Environment Variables

- **REACT_APP_API_URL:** This environment variable is used to connect the frontend React application with the backend API.

### 4. Database Structure

The application uses a relational database to store users, books, categories, and orders. The key entities are:
- **Users:** Contains user information like name, email, and password (hashed).
- **Books:** Contains details about the books, including title, author, price, description, stock, and category.
- **Categories:** Organizes books into different genres (e.g., Fiction, Non-fiction, Science).
- **Orders:** Stores user orders, including shipping details, total amount, and order status.

Here is a simplified SQL schema for reference:

```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100),
    Email NVARCHAR(100) UNIQUE,
    PasswordHash NVARCHAR(255),
    Phone NVARCHAR(15),
    ShippingAddress NVARCHAR(255)
);

CREATE TABLE Categories (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100)
);

CREATE TABLE Books (
    Id INT PRIMARY KEY IDENTITY,
    Title NVARCHAR(200),
    Author NVARCHAR(100),
    Price DECIMAL(10, 2),
    Description NVARCHAR(MAX),
    Stock INT,
    CategoryId INT FOREIGN KEY REFERENCES Categories(Id)
);

CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(Id),
    OrderDate DATETIME,
    TotalAmount DECIMAL(10, 2),
    Status NVARCHAR(50),
    ShippingAddress NVARCHAR(255),
    Email NVARCHAR(100),
    Phone NVARCHAR(15)
);

CREATE TABLE OrderItems (
    Id INT PRIMARY KEY IDENTITY,
    OrderId INT FOREIGN KEY REFERENCES Orders(Id),
    BookId INT FOREIGN KEY REFERENCES Books(Id),
    Quantity INT,
    PriceAtTimeOfPurchase DECIMAL(10, 2)
);
