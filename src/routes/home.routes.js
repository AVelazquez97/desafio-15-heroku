import { Router } from 'express';
import authenticationMiddleware from '../middlewares/auth/auth.middleware.js';
import path from 'path';

const router = Router();

router.get('/', authenticationMiddleware, (req, res) => {
  res.status(200).render(path.join(process.cwd(), '/src/views/layouts/home.hbs'), {
    email: req.user.email,
  });
});

export default router;