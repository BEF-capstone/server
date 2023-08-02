# server

## Database Setup

- Initialize a postgres server
  - update database url in .env file
  - postgresql://USER:PASSWORD@HOST:PORT/DATABASE
- Create a new postgres database
  - name it chef_compass

```
  createdb chef_compass
  npx prisma generate
  npx prisma db push
  npx prisma studio
```
