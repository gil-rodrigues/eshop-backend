import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Right here' });
});

usersRouter.post('/', (req: Request, res: Response) => {
  return res.json({ message: 'Right here' });
});

export default usersRouter;
