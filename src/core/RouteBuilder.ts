import express, { IRouter } from 'express'


// -- Define the shape of the controller object that our builder will accept.
// -- It maps HTTP methods to Express request handlers.
export type ControllerMap = {
    get?: express.Handler;
    post?: express.Handler;
    put?: express.Handler;
    patch?: express.Handler;
    delete?: express.Handler;
    [key: string]: express.Handler | undefined;
}

export class RouteBuilder {
    private middlewares: express.Handler[] = [];

    constructor(private router: IRouter, private path: string) { }


    /**
   * Applies a middleware to the route being built.
   * Can be chained.
   * @param middleware The Express middleware handler.
   * @returns The RouteBuilder instance for chaining.
   */
    public applyMiddleware(middlewares: express.Handler): this {
        this.middlewares.push(middlewares);
        return this;
    }


    public controller(controller: ControllerMap): void {
        const allowedMethods = ['get', 'post', 'put', 'patch', 'delete'] as const;
        type AllowedMethod = typeof allowedMethods[number];

        for (const method in controller) {
            if (
                Object.prototype.hasOwnProperty.call(controller, method) &&
                allowedMethods.includes(method as AllowedMethod)
            ) {
                const handler = controller[method];
                if (handler) {
                    (this.router[method as AllowedMethod])(this.path, ...this.middlewares, handler);
                    console.log(`✅  Route registered: ${method.toUpperCase()} ${this.path}`)
                }
            }
        }
    }

}