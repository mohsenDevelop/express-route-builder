import { Request, Response, NextFunction } from 'express';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    console.log('🛡️  Running authorize middleware...');

    // In a real app, you would check a JWT, session, etc.
    // For now, we'll just simulate a successful authorization.
    // req.user = { id: '123', roles: ['admin'] };
    next();
}


export const adminRole = (req: Request, res: Response, next: NextFunction) => {
    console.log('🛡️  Running adminRole middleware...');

    // In a real app, you would check the role from the req.user object.
    // const userRoles = req.user?.roles || [];
    // if (!userRoles.includes('admin')) {
    //   return res.status(403).send('Forbidden: Admins only');
    // }

    next();
}