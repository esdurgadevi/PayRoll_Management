import db from "../models/index.js";

const { Station } = db;

export const create = async (data) => {
  // Basic validation can be expanded with libraries like Joi for scalability
  if (!data.code || !data.station || !data.state) {
    throw new Error("Missing required fields");
  }

  const existing = await Station.findOne({ where: { code: data.code } });
  if (existing) {
    throw new Error("Station code already exists");
  }

  return await Station.create(data);
};

export const getAll = async () => {
  return await Station.findAll({
    order: [["code", "ASC"]], // Sorted for better usability
  });
};

export const getById = async (id) => {
  const station = await Station.findByPk(id);
  if (!station) {
    throw new Error("Station not found");
  }
  return station;
};

export const update = async (id, data) => {
  const station = await Station.findByPk(id);
  if (!station) {
    throw new Error("Station not found");
  }

  if (data.code) {
    const existing = await Station.findOne({
      where: { code: data.code, id: { [db.Sequelize.Op.ne]: id } },
    });
    if (existing) {
      throw new Error("Station code already exists");
    }
  }

  return await station.update(data);
};

export const remove = async (id) => {
  const station = await Station.findByPk(id);
  if (!station) {
    throw new Error("Station not found");
  }
  await station.destroy();
};