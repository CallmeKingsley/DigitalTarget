import { Router, Response, Request, NextFunction } from "express";
import wmataController from "./wmataRoutes";
const router = Router()


const validation  = (_req: Request, _res: Response, next: NextFunction) =>{

    next()
}



router.use('/wmata',validation, wmataController);


export default router