# SE 2235-40 Lab 3

Amada & Suoberon

## Setup

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/JoseArron/se-2235-40-lab-3
    cd se-2235-40-lab-3
    ```

2.  **Add Environment Variables**

    Copy the `.env.example` and `.env.test.example` files:

    ```bash
    cp .env.example .env
    cp .env.test.example .env.test
    ```

    Update the `.env` amd `.env.test` files with the provided values

3.  **Install Dependencies**

    ```bash
    npm install
    ```

4.  **Setup Prisma**

    ```
    npx prisma generate
    ```

## Run Tests

In the root directory, run

```bash
npm test
```
