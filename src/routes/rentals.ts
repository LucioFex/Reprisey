import { Router, Request, Response } from "express";
import { rentalsDefault } from "../services/rentals/rentals";

const router: Router = Router({ strict: true });

router.get("/", (req: Request, res: Response) => {
    return res.status(200).json(rentalsDefault);
});

router.get("/argenprop", (req: Request, res: Response) => {
    // TO DO
});

router.get("/mercado-libre", (req: Request, res: Response) => {
    // TO DO
});

router.get("/remax", (req: Request, res: Response) => {
    // TO DO
});

router.get("/zonaprop", (req: Request, res: Response) => {
    // TO DO
})

router.get("/inmoclick", (req: Request, res: Response) => {
    // TO DO
});

// router.get(
//     ["argenprop", "/mercado-libre", "remax", "zonaprop", "inmoclick"],
//     (req: Request, res: Response) => {}
// );

export { router as rentals };
