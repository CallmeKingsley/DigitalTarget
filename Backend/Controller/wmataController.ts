import { Request, Response } from "express";
import helper from '../Util/helper'


const getStations  = async (_req: Request, _res: Response) =>{
  try {
    const {data, error} = _req.body.Stations
    _res.status(200).json({
        message: "success retrieve stations", 
        data: helper.cleanData(data.Stations),
        error: false
    })
  } catch (error) {
    _res.status(500).json({
        message: "ran into issues retrieving stations",
        data: [],
        error: true
    })
  }
}


const getStationsInfo  = async (_req: Request, _res: Response) =>{
  try {
    const {data, error} = _req.body.StationInfo
    _res.status(200).json({
        message: "success got stations info",
        data: data.Trains,
        error: false
    })
  } catch (error) {
    _res.status(500).json({
        message: "ran into issues getting stations info",
        data: [],
        error: true
        
    })
  }
}


export default {getStations, getStationsInfo}