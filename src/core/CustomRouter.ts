import express, { IRouter } from 'express'
import { RouteBuilder } from './RouteBuilder'

export class CustomRouter {

    // -- We hold a private instance of the real Express Router
    private readonly expressRouter: IRouter;

    constructor() {
        this.expressRouter = express.Router();
    }

    /**
   * The entry point to start building a new route.
   * @param path The route path (e.g., '/api/v1/users').
   * @returns A new RouteBuilder instance to configure the route.
   */
    public createRoute(path: string): RouteBuilder {
        return new RouteBuilder(this.expressRouter, path);
    }

    /**
   * Exposes the underlying Express router to be used by the main app.
   * @returns The configured Express IRouter instance.
   */
    public getExpressRouter(): IRouter {
        return this.expressRouter;
    }
}