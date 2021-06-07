
import { Constants } from "./config/constants";
import { Jwt } from "./helpers/jwt";
import { ResponseBuilder } from "./helpers/responseBuilder";
import { AuthUtils } from "./modules/auth/authUtils";

export class Middleware {
    private authUtils: AuthUtils = new AuthUtils();

    /**
     *  this function should be validate logged users detail
     * @param req request object
     * @param res response object
     * @param next 
     */
    public authenticateUser = async (req, res, next) => {
        if (req.headers["x-auth-token"]) {
            const token = req.headers["x-auth-token"].replace("Bearer ", "");
            const decoded = Jwt.decodeAuthToken(
                token,
            );
            if (decoded && decoded.userId) {
                const user: Json = await this.authUtils.getUserDetailById(decoded.userId);
                if (user) {
                    if (!user.isActive) {
                        const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_ACCOUNT_NOT_ACTIVE"));
                        res.status(error.code).json({ error: error.error });
                        return;
                    }
                    req._user = user;
                    next();
                } else {
                    const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                    res.status(error.code).json({ error: error.error });
                    return;
                }
            } else {
                const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_TOKEN_EXP"));
                res.status(error.code).json({ error: error.error });
                return;
            }
        } else {
            const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
            res.status(error.code).json({ error: error.error });
            return;
        }
    }

}

