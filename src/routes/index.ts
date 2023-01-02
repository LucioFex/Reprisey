import { Router, Request, Response } from 'express';
import rentals from './rentals';

const router: Router = Router({ strict: true });

router.get('/', (req: Request, res: Response) => res.status(200).sendStatus(200));

// router.get('/currency-usd', (req: Request, res: Response) => {
//     // TO DO
// });

router.use('/rentals', rentals);

export default router;
