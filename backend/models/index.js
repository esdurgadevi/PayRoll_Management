import sequelize from "../config/db.js";
import UserModel from "./userModel.js";
import StationModel from "./station.js";
import MixingGroupModel from "./mixingGroup.js";
import MixingModel from "./mixing.js";
import VarietyModel from "./variety.js";

const db = {};
db.sequelize = sequelize;
db.User = UserModel(sequelize);
db.Station = StationModel(sequelize);
db.MixingGroup = MixingGroupModel(sequelize);
db.Mixing = MixingModel(sequelize);

// Define associations (optional but recommended for scalability)
db.MixingGroup.hasMany(db.Mixing, {
  foreignKey: "mixingGroupId",
  as: "mixings",
});

db.Mixing.belongsTo(db.MixingGroup, {
  foreignKey: "mixingGroupId",
  as: "mixingGroup",
});

db.Variety = VarietyModel(sequelize);

export default db;
