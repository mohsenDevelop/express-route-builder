import { Request, Response } from 'express';

const getAllUsers = (req: Request, res: Response) => {
    console.log('➡️  Executing controller: getAllUsers');
    res.status(200).json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
    ]);
}

const createUser = (req: Request, res: Response) => {
    console.log('➡️  Executing controller: createUser');

    res.status(201).json({ message: 'User created successfully', user: { id: 3, name: 'Charlie' } });
}

export const userController = {
    getAllUsers,
    createUser,
};