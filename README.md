# Desafio API NodeJS

Projeto "Desafio API NodeJS" apresentado pela [Rocketseat](https://rocketseat.com.br/) em Agosto de 2025.

## Descrição

Esta é uma API RESTful desenvolvida em NodeJS com Fastify e TypeScript. A API permite o gerenciamento de cursos, incluindo a criação, consulta e listagem de cursos. O projeto utiliza Drizzle ORM para interação com o banco de dados PostgreSQL, Zod para validação de schemas e Vitest para testes.

## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/llutti/desafio-api-nodejs.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente. Renomeie o arquivo `.env.example` para `.env` e preencha com as informações do seu banco de dados:
    ```bash
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```
4.  Execute as migrações do banco de dados:
    ```bash
    npm run db:migrate
    ```
5.  (Opcional) Popule o banco de dados com dados de teste:
    ```bash
    npm run db:seed
    ```

## Execução

Para iniciar o servidor em modo de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:7001`.

A API também disponibiliza uma documentação interativa usando Swagger, que pode ser acessada em `http://localhost:7001/docs`.

## Scripts

*   `npm run dev`: Inicia o servidor em modo de desenvolvimento com watch mode.
*   `npm run db:generate`: Gera os arquivos de migração do Drizzle.
*   `npm run db:migrate`: Executa as migrações do banco de dados.
*   `npm run db:seed`: Popula o banco de dados com dados de teste.
*   `npm run db:studio`: Abre o Drizzle Studio para visualizar e gerenciar o banco de dados.
*   `npm run lint`: Executa o linter para verificar o código.
*   `npm test`: Executa os testes da aplicação.

## API Endpoints

A API possui os seguintes endpoints:

*   `POST /courses`: Cria um novo curso.
    *   **Request Body:**
        ```json
        {
          "title": "string",
          "description": "string"
        }
        ```
    *   **Response (201):**
        ```json
        {
          "courseId": "uuid"
        }
        ```
*   `GET /courses`: Retorna uma lista de todos os cursos.
    *   **Query Params:**
        *   `search` (string, opcional): Filtra os cursos pelo título.
        *   `orderBy` (string, opcional, 'id' ou 'title'): Ordena os cursos.
        *   `page` (number, opcional): Paginação dos resultados.
    *   **Response (200):**
        ```json
        {
          "courses": [
            {
              "id": "uuid",
              "title": "string",
              "enrollments": "number"
            }
          ],
          "total": "number"
        }
        ```
*   `GET /courses/:id`: Retorna um curso específico pelo seu ID.
    *   **Response (200):**
        ```json
        {
          "course": {
            "id": "uuid",
            "title": "string",
            "description": "string"
          }
        }
        ```

## Tecnologias

*   [Node.js](https://nodejs.org/)
*   [Fastify](https://www.fastify.io/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Drizzle ORM](https://orm.drizzle.team/)
*   [PostgreSQL](https://www.postgresql.org/)
*   [Zod](https://zod.dev/)
*   [Vitest](https://vitest.dev/)
*   [@fastify/swagger](https://github.com/fastify/fastify-swagger)
*   [@scalar/fastify-api-reference](https://github.com/scalar/scalar)
*   [Pino Pretty](https://github.com/pinojs/pino-pretty)

## Estrutura do Banco de Dados

Abaixo está a estrutura das tabelas do banco de dados.

### Tabela `users`

| Coluna | Tipo   | Restrições       |
|--------|--------|------------------|
| id     | uuid   | Chave Primária   |
| name   | text   | Não Nulo         |
| email  | text   | Não Nulo, Único  |

### Tabela `courses`

| Coluna      | Tipo   | Restrições       |
|-------------|--------|------------------|
| id          | uuid   | Chave Primária   |
| title       | text   | Não Nulo, Único  |
| description | text   |                  |

### Tabela `enrollments`

| Coluna      | Tipo      | Restrições                |
|-------------|-----------|---------------------------|
| id          | uuid      | Chave Primária            |
| userId      | uuid      | Chave Estrangeira (users) |
| courseId    | uuid      | Chave Estrangeira (courses)|
| createdAt   | timestamp | Não Nulo                  |

## Diagrama de Entidade e Relacionamento

O diagrama abaixo descreve a estrutura do banco de dados.

```mermaid
erDiagram
    users {
        uuid id PK
        text name
        text email
    }
    courses {
        uuid id PK
        text title
        text description
    }
    enrollments {
        uuid id PK
        uuid userId FK
        uuid courseId FK
        timestamp createdAt
    }
    users ||--o{ enrollments : "has"
    courses ||--o{ enrollments : "has"
```

## Fluxo de Execução

O diagrama abaixo descreve o fluxo principal de execução da aplicação.

```mermaid
sequenceDiagram
    participant Client
    participant "Server (Fastify)"
    participant "Zod"
    participant "Drizzle ORM"
    participant "Database (PostgreSQL)"

    Client->>Server (Fastify): HTTP Request (e.g., POST /courses)
    Server (Fastify)->>Zod: Validate Request Body/Params
    Zod-->>Server (Fastify): Validation Result
    alt Request is Valid
        Server (Fastify)->>Drizzle ORM: Database Query
        Drizzle ORM->>Database (PostgreSQL): Execute SQL
        Database (PostgreSQL)-->>Drizzle ORM: SQL Result
        Drizzle ORM-->>Server (Fastify): Query Result
        Server (Fastify)-->>Client: HTTP Response (e.g., 201 Created)
    else Request is Invalid
        Server (Fastify)-->>Client: HTTP Response (e.g., 400 Bad Request)
    end
```

## Licença

Este projeto está licenciado sob a licença ISC.