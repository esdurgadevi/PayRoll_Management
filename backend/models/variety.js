import { DataTypes } from "sequelize";

const VarietyModel = (sequelize) => {
  const Variety = sequelize.define(
    "Variety",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      variety: {
        type: DataTypes.STRING(150),
        allowNull: false,
        trim: true,
      },
      fibre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        trim: true,
      },
    },
    {
      tableName: "varieties",
      timestamps: true,
      indexes: [
        { unique: true, fields: ["code"] },
      ],
    }
  );

  return Variety;
};

export default VarietyModel;