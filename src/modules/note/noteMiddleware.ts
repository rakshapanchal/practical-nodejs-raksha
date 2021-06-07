import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { NoteUtils } from "./noteUtils";

export class NoteMiddleware {
    private noteUtils: NoteUtils = new NoteUtils();

    /** 
     * this function should be check note id exists
     * @param req request object
     * @param res response object
     * @param next 
     */
    public checkIsValidNoteId = async (req, res, next) => {
        const result: Json = await this.noteUtils.getNoteById(req.params.id);
        if (result) {
            next();
        } else {
            const error = ResponseBuilder.badRequest(req.t("ERR_NOTE_NOT_FOUND"));
            res.status(error.code).json({ error: error.error });
            return;
        }
    }
}