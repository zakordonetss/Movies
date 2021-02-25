import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { PORT } from './units/config';
import { HelloConroller } from './controllers/hello';
import { MoviesController } from './controllers/movies';
import { globalErrorHandler, notFoundErrorHandler } from './controllers/error';

const app = express();

app
    .use(json())
    .use(urlencoded({ extended: true }))
	.use(cors({ credentials: true, origin: true }))
    .use(helmet())
    .use(HelloConroller)
    .use(MoviesController)
    .use(notFoundErrorHandler)
    .use(globalErrorHandler)
    .listen(PORT, () => console.log(`Server has been started at port: ${PORT}`))