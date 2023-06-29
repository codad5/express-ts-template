import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import compression from 'compression';
import { config } from 'dotenv';
config({path: `.env.${process.env.NODE_ENV || 'development'}.local` })
import { logger } from './utils/logger'
import mongoose from 'mongoose';
import redisClient from '@/src/services/redis';
import ReponseHandler from '@/src/utils/responseHandler'


class App {
    app 
    port : string | number = 3000
    env : string = "development"
    constructor() {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.initaliseMiddleware()
        this.startMongoose()
    }

    private initaliseMiddleware()
    {
        this.app.use(cookieParser());
        this.app.use(compression())
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(hpp());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(ReponseHandler.tieResponse)

    }

    public useRoute(path :string , Route : Router){
        this.app.use(path, Route)
        return this
    }   


    public start(port ?: string|number) {
        this.app.listen(port ?? this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${port ?? this.port}`);
            logger.info(`=================================`);
        });
    }
    
    private startMongoose()
    {
        const { MONGODB_USER, MONGODB_PASS, MONGODB_HOST, MONGODB_DB, MONGODB_URL } = process.env
        console.log(MONGODB_URL)
        mongoose.connect(MONGODB_URL ?? `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`)
        .then(() => {
            console.log('🚀 Connected to MongoDB');
        })
        .catch((err) => {
            console.error(' ❌ Failed to connect to MongoDB', err);
        });
    }

    closeMongoose()
    {
        process.on('SIGINT', async () => {
            try {
                await mongoose.disconnect();
                console.log('❌ Disconnected from MongoDB');
                process.exit(0);
            } catch (err) {
                console.error('❌ Failed to disconnect from MongoDB', err);
                process.exit(1);
            }
        });
        return this
    }

    closeRedis()
    {
        redisClient.on('end', () => {
            console.log('❌ Disconnected from Redis');
        });

        redisClient.on('error', (error) => {
            console.error('❌ Error connecting to Redis Cloud:', error);
            redisClient.disconnect(); // Disconnect from Redis on error
        });
        return this

    }
}

export default App;