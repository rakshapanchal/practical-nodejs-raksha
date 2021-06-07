import { Regex } from "../config/regex";
import bcryptjs = require("bcryptjs");
import { Constants } from "../config/constants";

export class Utils {

    /**this function shoulb be get page limit and skip
     * @param page  per page
     * @param limit limit data of page
     */
    public static getPageSkipAndLimit = (page: string, limit: string) => {
        const skip = limit ? +limit : Constants.DEFAULT_LIMIT; // for paginate records
        const pageLimit = page ? +page : Constants.DEFAULT_PAGE;
        return [pageLimit > 1 ? (pageLimit - 1) * skip : 0, skip];
    }

    /**this function should be validate password 
     * 
     * @param data 
     */
    public static isValidPassword = (data: string) => {
        const regex = Regex.PASSWORD;
        return regex.test(data);
    }

    /** function should be compare password
     * 
     * @param password password
     * @param existedPassword existed Password
     */
    public static compareHashPassword = (password: string, existedPassword: string) => {
        return bcryptjs.compareSync(password, existedPassword);
    }

    /** function should be convert text password into hash password
     * 
     * @param password password
     */
    public static convertPasswordInHash = (password: string) => {
        return bcryptjs.hashSync(password, Constants.HASH_STRING_LIMIT);
    }
}
