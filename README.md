[INFO] 12:00:00 PM ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.1.6)
Express server is listening on port 3000
Routes are configured
  - GET /
  - GET /api/v1/users
  - POST /api/v1/users

## Project Structure

The project is organized to separate concerns, making it scalable and easy to navigate.

├── src/
│   ├── core/                  # Core logic for the builder pattern
│   │   ├── CustomRouter.ts    # The main router factory
│   │   └── RouteBuilder.ts    # The fluent builder class
│   ├── controllers/           # Route handlers (the final logic)
│   │   └── user.controller.ts
│   ├── middlewares/           # Express middleware functions
│   │   └── auth.middleware.ts
│   ├── routes/                # Route definitions using the builder
│   │   └── index.ts
│   └── server.ts              # Express server setup and entry point
├── package.json
└── tsconfig.json

## How It Works: The API

### 1. The `CustomRouter`

The `CustomRouter` is a wrapper around the standard `express.Router()`. It acts as the factory for creating new route builders.

**`src/routes/index.ts`**
typescript
import { CustomRouter } from '@/core/CustomRouter';
export const router = new CustomRouter();

### 2. The Fluent API

Once you have a `CustomRouter` instance, you can start defining routes.

- **`.createRoute(path: string)`**: This is the entry point for the builder. It takes the route path (e.g., `/api/v1/users`) and returns a `RouteBuilder` instance.

- **`.applyMiddleware(middleware: RequestHandler)`**: This method is chainable and applies one or more middleware functions to the route. You can call it as many times as needed.

- **`.controller(controllerMap: ControllerMap)`**: This is the final method in the chain. It registers the controller handlers for different HTTP methods. The `ControllerMap` is an object where keys are HTTP verbs (`get`, `post`, `put`, `delete`, etc.) and values are the corresponding Express `RequestHandler`.

### 3. Full Example

Here is a complete example of defining a health check route and a more complex user route.

**`src/routes/index.ts`**

typescript
import { CustomRouter } from '@/core/CustomRouter';
import { userController } from '@/controllers/user.controller';
import { adminRole, authorize } from '@/middlewares/auth.middleware';
import { Request, Response } from 'express';

export const router = new CustomRouter();

// Simple health check route
router
  .createRoute('/')
  .controller({
    get: (req: Request, res: Response) => res.json({ status: 'OK' }),
  });

// User routes with middleware
router
  .createRoute('/api/v1/users')
  .applyMiddleware(authorize) // First, check if user is authenticated
  .applyMiddleware(adminRole)   // Then, check if user has admin role
  .controller({
    get: userController.getAllUsers,
    post: userController.createUser,
  });


## Running for Production

To create an optimized JavaScript build for production, you can use the following scripts:

**`package.json`**
json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/server.ts"
  }
}

1.  **Build the project:**
    ```bash
    npm run build
    ```
    This command runs the TypeScript compiler (`tsc`), which transpiles all `.ts` files from `src/` into `.js` files in the `dist/` directory. `tsc` automatically resolves the path aliases to correct relative paths in the output JavaScript.

2.  **Start the production server:**
    ```bash
    npm run start
    ```
    This runs the compiled application from the `dist` folder using Node.js.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## License

This project is [MIT](./LICENSE) licensed.