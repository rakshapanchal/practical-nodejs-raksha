import { Request, Response } from "express";
import { Constants } from "../../config/constants";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { NoteUtils } from "./noteUtils";
export class NoteController {
    private noteUtils: NoteUtils = new NoteUtils();

    public createNote = async (req: Request, res: Response) => {
        const { title, description } = req.body;
        const { id } = req._user;
        const noteData: Json = { title, description, userId: id };
        await this.noteUtils.createNote(noteData);
        const response = ResponseBuilder.successMessage(req.t("NOTE_CREATE_SUCCESS"));
        res.status(Constants.CREATED_SUCCESS_CODE).json(response);
    }

    public updateNote = async (req: Request, res: Response) => {
        const { title, description } = req.body;
        const noteData: Json = { title, description };
        await this.noteUtils.updateNote(noteData, req.params.id);
        const response = ResponseBuilder.successMessage(req.t("NOTE_UPDATE_SUCCESS"));
        res.status(response.code).json(response);
    }

    public deleteNote = async (req: Request, res: Response) => {
        const { id } = req.params;
        await this.noteUtils.deleteNote(id);
        const response = ResponseBuilder.successMessage(req.t("NOTE_DELETE_SUCCESS"));
        res.status(response.code).json(response);
    }

    public getNoteDetail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const response = ResponseBuilder.data(await this.noteUtils.getNoteById(id));
        res.status(response.code).json(response);
    }

    public getNotes = async (req: Request, res: Response) => {
        const { id } = req._user;
        const { rows, count } = await this.noteUtils.getNotes(id, req.query);
        const response = ResponseBuilder.dataWithPaginate(rows, count);
        res.status(response.code).json(response);
    }
}
