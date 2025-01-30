# To run the application on your local machine

1. Install nodejs 20
2. Install pnpm
3. Navigate to the root directory of this project in the terminal
4. Run: pnpm setup:start

# I have provided an .env file with a DB URL (free) to ensure smooth setup (I will delete the serverless DB in some days)

## Questions

### Which database have you chosen and why?

I chose **PostgreSQL** as the database for this project. PostgreSQL is a powerful, open-source relational database that supports advanced features such as ACID compliance and complex queries, making it ideal for applications requiring structured data storage and integrity. It also integrates well with Drizzle, which I used for managing migrations.

### 3 things that you learned from this assignment?

1. **Code Modularity and Structure:** I learned how to modularize the code and structure the project properly, making it more maintainable and scalable.
2. **Using pnpm for Package Management:** I gained a deeper understanding of pnpm and its performance and storage advantages over npm, allowing for faster installs and less disk space usage.
3. **Managing Migrations with Drizzle:** I learned how to handle database migrations with Drizzle, though it proved to be a bit tricky at times.

### What was the most difficult part of the assignment?

The most challenging part was **managing migrations with Drizzle**. The process was more complicated than expected, requiring extra attention to ensure smooth integration with PostgreSQL.

### What would you have done differently given more time?

If given more time, I would have:

-   **Added a logger** (e.g., Winston or Pino) to improve debugging and logging throughout the application.
-   **Enhanced error handling** and ensured proper error responses are sent to the client in case of failures.
-   **Written tests** for unit and integration testing to ensure the application’s stability and reliability.
-   **Added monitoring** using Grafana for better performance tracking and alerts.
-   **Dockerized the application and the database** using Docker Compose to simplify deployment and environment setup.
-   **Implemented authentication and authorization** on protected routes to secure the application.
-   **Added Swagger documentation** for the API to improve usability and ease of integration with other systems.
