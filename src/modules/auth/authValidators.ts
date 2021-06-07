import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Utils } from "../../helpers/utils";


@ValidatorConstraint({ async: false })
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
    public validate(password: string, args: ValidationArguments) {
        return Utils.isValidPassword(password);
    }
}
