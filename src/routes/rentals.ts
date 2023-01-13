import { Router, Request, Response } from 'express';
import { ObjectStNu } from '../interfaces/types';
import { IFeats as IArgenpropData } from '../interfaces/argenprop';
import rentalsDefault from '../services/rentals/rentals';
import argenpropSearch from '../services/rentals/argenprop';

const router: Router = Router({ strict: true });

// Absolute url: /rentals/...
router.get('/', (req: Request, res: Response) => res.status(200).json(rentalsDefault));

router.get('/argenprop/:location', async (req: Request, res: Response) => {
    // Rental location and filters (query)
    const { location } = req.params;
    const query: ObjectStNu = req.query as ObjectStNu;

    try {
        const argenpropData: IArgenpropData[] | undefined = await argenpropSearch(location, query);
        res.status(200).json(argenpropData);
    } catch (err: unknown) {
        // eslint-disable-next-line no-console
        console.error(err);
        res.status(404).json({ err: 'Can\' access to Argenprop API' });
    }
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
