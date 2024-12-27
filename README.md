


## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **MongoDB** (installed locally or via Docker)
- **MongoDB Compass** (optional, for GUI management of MongoDB)

### MongoDB Connection

This application connects to a MongoDB database locally via `mongodb://localhost:27017`. If you want to change the database settings, you can modify the connection settings in the `/src/config/db.ts` file.

## Installation

Follow these steps to get the project running on your local machine:

### 1. Install npm packages

```bash
npm install
```
### 2. Run build
```bash
npm run build
```

### 3. Run server
```bash
npm start
```
### 4. Run tests (unit & integration)
```bash
npm run test
```

