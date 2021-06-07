import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { AuthUtils } from "./authUtils";

export class AuthMiddleware {
    private authUtils: AuthUtils = new AuthUtils();

    /** 
     * this function should be check new user email is unique
     * @param req request object
     * @param res response object
     * @param next 
     */
    public checkIsUniqueEmail = async (req, res, next) => {
        const { email } = req.body;
        const result: Json = await this.authUtils.getUserDetailByEmail(email);
        if (result && result.id) {
            const error = ResponseBuilder.badRequest(req.t("ERR_EMAIL_ALREADY_USED"));
            res.status(error.code).json({ error: error.error });
            return;
        } else {
            next();
        }
    }

    /** 
     * this function should be check user email is existed or not
     * @param req request object
     * @param res response object
     * @param next 
     */
    public checkIsEmailExists = async (req, res, next) => {
        const { email } = req.body;
        const result: Json = await this.authUtils.getUserDetailByEmail(email);
        if (result && result.id) {
            req.body._user = result;
            next();
        } else {
            const error = ResponseBuilder.badRequest(req.t("ERR_EMAIL_NOT_EXIST"));
            res.status(error.code).json({ error: error.error });
            return;
        }
    }

    /** 
     * this function should be check user password
     * @param req request object
     * @param res response object
     * @param next 
     */
    public checkIsValidPassword = async (req, res, next) => {
        const { _user, password } = req.body;
        const isPasswordValid: boolean = Utils.compareHashPassword(password, _user.password);
        if (!isPasswordValid) {
            const error = ResponseBuilder.badRequest(req.t("INVALID_CREDENTIALS"));
            return res.status(error.code).json({ error: error.error });
        }
        next();
    }


}
