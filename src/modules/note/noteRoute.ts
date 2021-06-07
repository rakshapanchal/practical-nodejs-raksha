import { Router } from "express";
import { Validator } from "../../validate";
import { NoteController } from "./noteController";
import { NoteMiddleware } from "./noteMiddleware";
import { NoteModel } from "./noteModel";

const router: Router = Router();
const v: Validator = new Validator();
const noteController = new NoteController();
const noteMiddleware = new NoteMiddleware();

// For Create note API
const noteCreateRoutePath = [
    v.validate(NoteModel),
    noteController.createNote];
router.post("/", noteCreateRoutePath);

// For Update note API
const noteUpdateRoutePath = [
    v.validate(NoteModel),
    noteMiddleware.checkIsValidNoteId,
    noteController.updateNote];
router.put("/:id", noteUpdateRoutePath);

// For Delete note API
const noteDeleteRoutePath = [
    noteMiddleware.checkIsValidNoteId,
    noteController.deleteNote];
router.delete("/:id", noteDeleteRoutePath);

// For Note detail API
const fetchNoteDetailRoutePath = [
    noteController.getNoteDetail];
router.get("/:id", fetchNoteDetailRoutePath);

// List Note By Users with pagination API
const fetchNotesRoutePath = [
    noteController.getNotes];
router.get("/", fetchNotesRoutePath);



export const NoteRoute: Router = router;
