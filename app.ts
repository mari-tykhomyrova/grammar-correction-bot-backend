import express, {Application} from 'express';
import cors from 'cors';
import correctionsRoutes from './routes/connections.routes';
import randomRoutes from "./routes/random.routes";

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors({
      origin: ['http://localhost:3000'],
    }));
  }

  routes() {
    this.server.use('/corrections', correctionsRoutes);
    this.server.use('/random', randomRoutes);
  }
}

export default new App().server;
