import { Response, Request, NextFunction } from "express";
import fetchWithApiKey from "../Util/ApiFetch";
import RedisStore from 'rate-limit-redis';
import { rateLimit } from 'express-rate-limit'
import { createClient } from 'redis';


const redisClient = createClient({
  socket: {
    host: 'localhost', // or your Redis host
    port: 6379,
  }
});
redisClient.connect().catch(console.error);

//this keys should be place in the .env file for security
const API_KEY = '6e6deb8270924bdbb0f2b7f673a1c87a';


const getStationsMiddleWare = async (_req: Request,  _res: Response, next: NextFunction) =>{
    const API_URL = 'https://api.wmata.com/Rail.svc/json/jStations';
    try {
        fetchWithApiKey(API_URL, API_KEY, 'GET')
        .then((data) => {
            _req.body.Stations ={data: data, error: false}
        })
        .catch((err) => {
            _req.body.Stations = {data: [], error: true}
        }).finally(()=>{
             next()
        })
    } catch (error) {
        console.log('err', error)
    }
}

const getStationInfoMiddleWare = async (_req: Request,  _res: Response, next: NextFunction) =>{
    const { code} = _req.body
    const API_URL = `http://api.wmata.com/StationPrediction.svc/json/GetPrediction/${code}`;

     const cached = await redisClient.get(`stationCode:${code}`);
     
    try {
      if (cached) {
         _req.body.StationInfo = {data: JSON.parse(cached), error: false}
      }else{
        fetchWithApiKey(API_URL, API_KEY, 'GET')
        .then((data) => {
            console.log('data =>', data)
            _req.body.StationInfo ={data: data, error: false}
            redisClient.setEx(`stationCode:${code}`, 1000, JSON.stringify(data));
        })
        .catch((err) => {
            _req.body.StationInfo = {data: [], error: true}
        }).finally(()=>{
             next()
        });
      }
    } catch (error) {
        console.log('err', error)
    }
}

const RateLimiting = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	store: new RedisStore({
    sendCommand: async (...args: string[]) => {
      return redisClient.sendCommand(args);
    }
  })
})

export default {getStationsMiddleWare, getStationInfoMiddleWare, RateLimiting}
