import { DataTypes } from "sequelize";
import { NoteTable, Tables, UserTable } from "../config/tables";
import { Connection } from "../database";
import user from "./user";

const { sequelize } = Connection.get();

const note = sequelize.define(Tables.NOTE,
  {
    id: {
      type: DataTypes.INTEGER,
      field: NoteTable.ID,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    title: {
      type: DataTypes.STRING,
      field: NoteTable.TITLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      field: NoteTable.DESCRIPTION,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: NoteTable.USER_ID,
      allowNull: false,
      references: {
        model: user,
        key: UserTable.ID,
      },
    },
    // isActive: {
    //   type: DataTypes.BOOLEAN,
    //   field: NoteTable.IS_ACTIVE,
    //   defaultValue: true,
    // },
    createdAt: {
      type: DataTypes.DATEONLY,
      field: NoteTable.CREATED_AT,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: NoteTable.UPDATED_AT,
      defaultValue: DataTypes.NOW,
    },
  }, {
  tableName: Tables.NOTE,
});

note.belongsTo(user, { as: "user", foreignKey: "userId" });

export default note;
