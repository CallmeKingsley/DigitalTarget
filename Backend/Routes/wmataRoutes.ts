import { Router } from "express";
import Controller from "../Controller";
import Middlewares from "../Middlewares";

const router = Router()

router.get('/getStations',Middlewares.getStationsMiddleWare, Controller.wmataController.default.getStations)
router.get('/getStationsInfo',Middlewares.getStationInfoMiddleWare, Controller.wmataController.default.getStationsInfo)

export default router