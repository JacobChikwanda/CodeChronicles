
# Authentication

## About the Repository

This repository showcases the effective use of JSON Web Tokens (JWT) within an Express.js application, emphasizing security through secure cookies and incorporating email functionalities for user interactions. It utilizes Prisma and SQLite for data management, providing a comprehensive example of building secure authentication systems in web applications.

## Getting Started

Follow these steps to get the project up and running on your local machine:

### Prerequisites

- Node.js installed on your system.
- A basic understanding of Express.js and Node.js.
- An email service provider for sending emails.

### Installation

1. **Clone the Repository**

   Begin by cloning the repository to your local machine with the following command:
   ```
   git clone <repository-url>
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required dependencies:
   ```
   cd path/to/project
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of your project directory. Add the following environment variables to configure the application:
   ```
   PORT=5000
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=<your_jwt_secret>
   RESEND_API_KEY=<your_resend_api_key>
   SERVER_HOST=<your_server_host> # Optional
   ```
   Replace `<your_jwt_secret>` and `<your_resend_api_key>` with your actual JWT secret and resend API key. The `SERVER_HOST` is optional and can be configured if needed.

4. **Initialize the Database**

   Use Prisma to set up your SQLite database:
   ```
   npx prisma migrate dev
   ```

5. **Start the Server**

   Run the following command to start the server:
   ```
   npm start
   ```

   Your server should now be running on `http://localhost:5000` or another port if you specified a different one in the `.env` file.

### Usage

- To authenticate users, send a POST request to `/api/user/login` with the user's email and password.
- Use the JWT token received upon authentication to access protected routes.
- Send emails, such as confirmation emails, using the integrated email functionality.

## Contributing

Contributions to enhance this project are welcome. Please follow the standard fork and pull request workflow.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
