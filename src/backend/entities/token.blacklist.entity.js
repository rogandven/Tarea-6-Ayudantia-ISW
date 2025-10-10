import { EntitySchema } from "typeorm";

export const TokenBlackList = new EntitySchema({
  name: "TokenBlackList",
  tableName: "token_black_lists",
  columns: {
    token: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
      primary: true
    },
  },
});
