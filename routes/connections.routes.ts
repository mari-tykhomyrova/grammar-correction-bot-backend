import {Router} from "express";
import {ConnectionsController} from "../controllers/connections.controller";

const correctionsRoutes: Router = Router();
const connectionsController = new ConnectionsController();

correctionsRoutes.get('/', connectionsController.getAll);
correctionsRoutes.post('/', connectionsController.create);

export default correctionsRoutes;
