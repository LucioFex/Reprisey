import { Router, Request, Response } from 'express';
import { IArgenpropFunc } from '../utils/interfaces/rentalsInterfaces';
import rentalsDefault from '../services/rentals/rentals';
import argenpropSearch from '../services/rentals/argenprop';

const router: Router = Router({ strict: true });

// Absolute url: /rentals/...
router.get('/', (req: Request, res: Response) => res.status(200).json(rentalsDefault));

router.get('/argenprop/:location', (req: Request, res: Response) => {
    // Rental location and filters (query)
    const { location } = req.params;
    const { query } = req;

    const argenpropData: Promise<IArgenpropFunc> = argenpropSearch(location, query);
    res.status(200).json(argenpropData);
});

// router.get('/mercado-libre', (req: Request, res: Response) => {
//     // TO DO
// });

// router.get('/remax', (req: Request, res: Response) => {
//     // TO DO
// });

// router.get('/zonaprop', (req: Request, res: Response) => {
//     // TO DO
// });

// router.get('/inmoclick', (req: Request, res: Response) => {
//     // TO DO
// });

// router.get(
//     ['argenprop', '/mercado-libre', 'remax', 'zonaprop', 'inmoclick'],
//     (req: Request, res: Response) => {}
// );

export default router;
