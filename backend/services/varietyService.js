import db from "../models/index.js";

const { Variety } = db;

export const createVariety = async (data) => {
  if (!data.code || !data.variety || !data.fibre) {
    throw new Error("Code, variety name, and fibre are required");
  }

  const existing = await Variety.findOne({ where: { code: data.code } });
  if (existing) {
    throw new Error("Variety code already exists");
  }

  return await Variety.create({
    code: data.code,
    variety: data.variety.trim(),
    fibre: data.fibre.trim(),
  });
};

export const getAllVarieties = async () => {
  return await Variety.findAll({
    order: [["code", "ASC"]],
  });
};

export const getVarietyById = async (id) => {
  const variety = await Variety.findByPk(id);
  if (!variety) {
    throw new Error("Variety not found");
  }
  return variety;
};

export const updateVariety = async (id, data) => {
  const variety = await Variety.findByPk(id);
  if (!variety) {
    throw new Error("Variety not found");
  }

  if (data.code && data.code !== variety.code) {
    const existing = await Variety.findOne({
      where: {
        code: data.code,
        id: { [db.Sequelize.Op.ne]: id },
      },
    });
    if (existing) {
      throw new Error("Variety code already in use");
    }
  }

  return await variety.update({
    code: data.code !== undefined ? data.code : variety.code,
    variety: data.variety ? data.variety.trim() : variety.variety,
    fibre: data.fibre ? data.fibre.trim() : variety.fibre,
  });
};

export const deleteVariety = async (id) => {
  const variety = await Variety.findByPk(id);
  if (!variety) {
    throw new Error("Variety not found");
  }
  await variety.destroy();
};