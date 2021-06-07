export class Tables {
  public static readonly USER = "users";
  public static readonly NOTE = "notes";
}

export enum UserTable {
  ID = 'id',
  NAME = 'name',
  EMAIL = 'email',
  MOBILE_NUMBER = 'mobileNumber',
  IS_ACTIVE = "isActive",
  PASSWORD = 'password',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

export enum NoteTable {
  ID = 'id',
  TITLE = 'title',
  USER_ID = "userId",
  DESCRIPTION = 'description',
  IS_ACTIVE = "isActive",
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}
