import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.post('/', (req: Request, res: Response) => {
  return res.json({ message: 'Right here' });
});

export default usersRouter;
