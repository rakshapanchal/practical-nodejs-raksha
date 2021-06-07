import { DataTypes } from "sequelize";
import { Tables, UserTable } from "../config/tables";
import { Connection } from "../database";

const { sequelize } = Connection.get();

const user = sequelize.define(Tables.USER,
  {
    id: {
      type: DataTypes.INTEGER,
      field: UserTable.ID,
      primaryKey: true,
      autoIncrement: true,
      index: true,
    },
    name: {
      type: DataTypes.STRING,
      field: UserTable.NAME,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      field: UserTable.EMAIL,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      field: UserTable.PASSWORD,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      field: UserTable.MOBILE_NUMBER,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: UserTable.IS_ACTIVE,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: UserTable.CREATED_AT,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: UserTable.UPDATED_AT,
      defaultValue: DataTypes.NOW,
    },
  }, {
  tableName: Tables.USER,
},
);

export default user;
