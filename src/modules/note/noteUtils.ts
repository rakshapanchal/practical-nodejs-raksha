import { Op } from "sequelize";
import { Constants } from "../../config/constants";
import { NoteTable } from "../../config/tables";
import { Utils } from "../../helpers/utils";
import note from "../../models/note";

export class NoteUtils {

  /** 
   * this function should be create post
   * @param noteDetail note details
   */
  public async createNote(noteDetail: Json) {
    return await note.create(noteDetail);
  }

  /** 
  * this function should be update note
  * @param noteDetail  note details
  * @param noteId  note Id
  */
  public async updateNote(noteDetail: Json, noteId: number) {
    return await note.update(
      noteDetail,
      {
        where: { id: noteId },
      },
    );
  }

  /** 
 * this function should be delete note
 * @param noteId note Id
 */
  public async deleteNote(noteId: number) {
    await note.destroy({
      where: {
        id: noteId,
      },
    });
  }

  /** 
   * this function should be fetch note details
   * @param noteId note Id
   */
  public async getNoteById(noteId: number) {
    const result = await note.findOne({
      where: {
        id: noteId
      },
      attributes: [
        [NoteTable.ID, 'noteId'],
        NoteTable.TITLE,
        NoteTable.DESCRIPTION,
        NoteTable.IS_ACTIVE,
        NoteTable.CREATED_AT
      ],
    });
    return result;
  }

  /**
  * this function should be fetch note list by users
  */
  public async getNotes(userId: string, queryParams: any) {
    let { page, limit, search, sortBy, sortOrder } = queryParams;
    const [skip, pageLimit] = Utils.getPageSkipAndLimit(page, limit);
    const where: any = { userId };
    if (search) {
      where.title = {
        [Op.like]: `%${search}%`
      }
    }
    const sequelizeObj: any = {
      where: {
        ...where,
      },
      attributes: [
        [
          NoteTable.ID, 'noteId'],
        NoteTable.TITLE,
        NoteTable.DESCRIPTION,
        NoteTable.CREATED_AT
      ],
      offset: skip,
      limit: pageLimit,
    };
    sortBy = sortBy || NoteTable.ID;
    sortOrder = sortOrder || Constants.DEFAULT_SORTING_ORDER;
    if (sortBy && sortOrder) {
      sequelizeObj.order = [[sortBy, sortOrder]];
    }
    const result = await note.findAndCountAll(sequelizeObj);
    return result;
  }
}
