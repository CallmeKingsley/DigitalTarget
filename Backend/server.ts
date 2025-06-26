import Express from 'express'
import api from './Routes/api'
import MiddleWare from './Middlewares/index'

const app  = Express();
const port = 3000

app.use(Express.json())
app.use(MiddleWare.RateLimiting)
app.use('/api', api)


if(require.main === module){

    app.listen(port, ()=>{
        console.log('connect')
    })
}

export default app