import { IsEmail, IsNotEmpty, IsOptional, MaxLength, Validate } from "class-validator";
import { Constants } from "../../config/constants";
import { Model } from "../../model";
import { IsValidPasswordConstraint } from "./authValidators";

export class LoginModel extends Model {
    @IsEmail({}, { message: "ERR_INVALID_EMAIL" })
    @IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
    public email: string;

    @IsNotEmpty({ message: "ERR_PASSWORD_REQUIRED" })
    public password: string;

    constructor(body: any) {
        super();
        const {
            email,
            password,
        } = body;

        this.email = email;
        this.password = password;
    }
}

export class SignUpModel extends Model {
    @MaxLength(Constants.EMAIL_MAX_LENGTH, { message: "ERR_MAX_LENGTH_EMAIL" })
    @IsEmail({}, { message: "ERR_INVALID_EMAIL" })
    @IsNotEmpty({ message: "ERR_EMAIL_REQUIRED" })
    public email: string;


    @Validate(IsValidPasswordConstraint, {
        message: "ERR_INVALID_PASSWORD_VALIDATIONS",
    })
    @IsNotEmpty({ message: "ERR_PASSWORD_REQUIRED" })
    public password: string;

    @MaxLength(Constants.NAME_MAX_LENGTH, { message: "ERR_MAX_LENGTH_NAME" })
    @IsNotEmpty({ message: "ERR_NAME_REQUIRED" })
    public name: string;

    @IsOptional()
    public mobileNumber: string;
    constructor(body: any) {
        super();
        const {
            email,
            password,
            name,
            mobileNumber
        } = body;

        this.email = email;
        this.password = password;
        this.name = name;
        this.mobileNumber = mobileNumber;   
    }
}
