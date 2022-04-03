import { Router, Request, Response } from 'express';
import User from '../models/User';

const usersRouter = Router();

usersRouter.post('/', (req : Request, res : Response ) => {
    const { name, email } = req.body;

    const user = new User(name, email);

    return res.json(user);
});

export default usersRouter;
