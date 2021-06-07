
import { Router } from "express";
import { Validator } from "../../validate";
import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddleware";
import { LoginModel, SignUpModel } from "./authModel";
// Assign router to the express.Router() instance
const router: Router = Router();

const v: Validator = new Validator();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

// for sign-up API
const SignupRoutePath = [
    v.validate(SignUpModel),
    authMiddleware.checkIsUniqueEmail,
    authController.signup];
router.post("/sign-up", SignupRoutePath);

// for login API
const LoginRoutePath = [
    v.validate(LoginModel),
    authMiddleware.checkIsEmailExists,
    authMiddleware.checkIsValidPassword,
    authController.login];
router.post("/login", LoginRoutePath);

// Export the express.Router() instance to be used by server.ts
export const AuthRoute: Router = router;
