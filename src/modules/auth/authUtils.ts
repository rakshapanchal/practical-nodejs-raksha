import { Tables, UserTable } from "../../config/tables";
import user from "../../models/user";

export class AuthUtils {

    /** 
     * this function should be used for create users
     * @param userDetail users detail
     */
    public async createUser(userDetail: Json) {
        const newUser = await user.create(userDetail);
        return newUser.id;
    }

    /**
     * this function should be used for get user detail by email Id
     * @param email string
     */
    public async getUserDetailByEmail(email: string) {
        const result = await user.findOne({
            where: {
                email,
                isActive: true
            },
            attributes: [
                UserTable.ID,
                UserTable.EMAIL,
                UserTable.PASSWORD,
                UserTable.NAME
            ],
        });
        return result;
    }


    /**
     * this function should be used for get user detail by Id
     * @param id number
     */
    public async getUserDetailById(id: number) {
        const result = await user.findOne({
            where: {
                id,
                isActive: true
            },
            attributes: [
                UserTable.ID,
                UserTable.EMAIL,
                UserTable.NAME,
                UserTable.MOBILE_NUMBER,
                UserTable.IS_ACTIVE,
            ],
        });
        return result;
    }
}
