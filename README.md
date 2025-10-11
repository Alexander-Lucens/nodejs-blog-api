
## Setup & Installation

1.  Clone the repository:
    ```sh
    git clone [path to git]
    ```
2.  Create a `.env` file in the root directory and add your environment variables:
    ```
    PORT=3000

    JWT_SECRET=<Your JWT Secret>
    DB_PASSWORD=<Your MongoDB password>
    DB_USER=<Your MongoDB username>
    DB_URL=<Your MongoDB Connection String>

    TEST_DB_URL=<Your MongoDB Connection String>

    JWT_SECRET=<Your JWT secret>
    JWT_EXPIRES_IN=<Prefered expiration time for session>

    NODE_ENV=production // If not by default dev
    ```
3.  Make it ready.
    Install all required packages and run tests on API.
    Checks is project ready to run.
    ```sh
    ./check.sh
    ```
