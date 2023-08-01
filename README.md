# server

## Database Setup

- Initialize a postgres server
  - update database url in .env file
  - postgresql://USER:PASSWORD@HOST:PORT/DATABASE
- Run npx prisma migrate dev --name init
