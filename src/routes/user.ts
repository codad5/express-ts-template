import { Router  } from "express";
import UserController from "../controllers/user";

const router = Router();
    
router.post('/signup', UserController.signup);

router.post('/greet', UserController.greet);