import { IsNotEmpty, MaxLength } from "class-validator";
import { Constants } from "../../config/constants";
import { Model } from "../../model";

export class NoteModel extends Model {

    @MaxLength(Constants.NOTE_TITLE_MAX_LENGTH, { message: "ERR_MAX_LENGTH_NOTE_TITLE" })
    @IsNotEmpty({ message: "ERR_NOTE_TITLE_REQUIRED" })
    public title: string;

    @IsNotEmpty({ message: "ERR_NOTE_DESCRIPTION_REQUIRED" })
    public description: string;

    constructor(body: any) {
        super();
        const {
            title,
            description
        } = body;
        this.title = title;
        this.description = description;
    }
}

