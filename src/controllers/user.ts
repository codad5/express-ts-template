import Validator from "../utils/Validator"
import CourseModel  from "../models/user";
import responseHandler from "../utils/responseHandler";
import { CreateUserRequest, GreetingRequest } from "../types/request";
import CustomException from "../utils/Exceptions/CustomException";

export default class UserController {
    static async signup(req: any, res: any) {
        const { email, username, name } : CreateUserRequest = req.body;
        try {
            // const user = await UserSignupController.signup(email, password, name);
            responseHandler.sendSuccess({email, verified : true, name}, "User created successfully");
        } catch (error) {
            responseHandler.sendError({ email: email, verified: false, name: name }, (error as Error).message, (error as CustomException).code);
        }
    }
    static async greet(req: any, res: any) {
        try {
            const { name } : GreetingRequest= req.body;
            // const greeting = await UserSignupController.greet(name);
            responseHandler.sendSuccess({ greeting : "" }, "Greeting sent successfully");
        } catch (error) {
            responseHandler.sendError({}, (error as Error).message, (error as CustomException).code);
        }
    }
}