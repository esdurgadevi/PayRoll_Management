import { DataTypes } from "sequelize";

const StationModel = (sequelize) => {
  const Station = sequelize.define(
    "Station",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Ensures codes are unique for scalability and data integrity
      },
      station: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "stations",
      timestamps: true, // Maintains createdAt/updatedAt for auditing
    }
  );

  return Station;
};

export default StationModel;