import {Router} from "express";
import {RandomController} from "../controllers/random.controller";

const randomRoutes: Router = Router();
const randomController = new RandomController();

randomRoutes.get('/', randomController.getRandom);

export default randomRoutes;
