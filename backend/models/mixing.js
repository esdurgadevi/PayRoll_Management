import { DataTypes } from "sequelize";

const MixingModel = (sequelize) => {
  const Mixing = sequelize.define(
    "Mixing",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mixingCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      mixingName: {
        type: DataTypes.STRING(150),
        allowNull: false,
        trim: true,
      },
      fibreName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        trim: true,
      },
      mixingGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "mixing_groups", // table name from previous MixingGroup
          key: "id",
        },
        onDelete: "RESTRICT", // Prevent deletion of group if mixings exist
        onUpdate: "CASCADE",
      },
    },
    {
      tableName: "mixings",
      timestamps: true,
      indexes: [
        { unique: true, fields: ["mixingCode"] },
        { fields: ["mixingGroupId"] }, // For faster queries by group
      ],
    }
  );

  return Mixing;
};

export default MixingModel;