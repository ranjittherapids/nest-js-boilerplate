## Nest JS

1. npm i -g @nestjs/cli
2. nest new backend
3. nest g -h

## Postgres SQL

1. sudo -u postgres psql
2. ALTER USER postgres PASSWORD 'admin@1234';
3. CREATE DATABASE typeorm_with_nestjs;
4. sudo service postgresql restart

## Typeorm

For Migration: yarn typeorm:migration:generate src/migrations/migrationName
               yarn typeorm:migration:run
