import db from "../models/index.js";

const { Mixing, MixingGroup } = db;

export const createMixing = async (data) => {
  if (!data.mixingCode || !data.mixingName || !data.fibreName || !data.mixingGroupId) {
    throw new Error("All fields are required: mixingCode, mixingName, fibreName, mixingGroupId");
  }

  // Check unique mixingCode
  const existingCode = await Mixing.findOne({ where: { mixingCode: data.mixingCode } });
  if (existingCode) {
    throw new Error("Mixing code already exists");
  }

  // Verify mixing group exists
  const group = await MixingGroup.findByPk(data.mixingGroupId);
  if (!group) {
    throw new Error("Mixing group not found");
  }

  return await Mixing.create({
    mixingCode: data.mixingCode,
    mixingName: data.mixingName.trim(),
    fibreName: data.fibreName.trim(),
    mixingGroupId: data.mixingGroupId,
  });
};

export const getAllMixings = async () => {
  return await Mixing.findAll({
    include: [{ model: MixingGroup, as: "mixingGroup", attributes: ["id", "mixingName"] }],
    order: [["mixingCode", "ASC"]],
  });
};

export const getMixingById = async (id) => {
  const mixing = await Mixing.findByPk(id, {
    include: [{ model: MixingGroup, as: "mixingGroup", attributes: ["id", "mixingName"] }],
  });
  if (!mixing) {
    throw new Error("Mixing not found");
  }
  return mixing;
};

export const updateMixing = async (id, data) => {
  const mixing = await Mixing.findByPk(id);
  if (!mixing) {
    throw new Error("Mixing not found");
  }

  // Unique check only if code changes
  if (data.mixingCode && data.mixingCode !== mixing.mixingCode) {
    const existing = await Mixing.findOne({
      where: {
        mixingCode: data.mixingCode,
        id: { [db.Sequelize.Op.ne]: id },
      },
    });
    if (existing) {
      throw new Error("Mixing code already in use");
    }
  }

  // Optional: check group if updated
  if (data.mixingGroupId && data.mixingGroupId !== mixing.mixingGroupId) {
    const group = await MixingGroup.findByPk(data.mixingGroupId);
    if (!group) {
      throw new Error("Mixing group not found");
    }
  }

  return await mixing.update({
    mixingCode: data.mixingCode !== undefined ? data.mixingCode : mixing.mixingCode,
    mixingName: data.mixingName ? data.mixingName.trim() : mixing.mixingName,
    fibreName: data.fibreName ? data.fibreName.trim() : mixing.fibreName,
    mixingGroupId: data.mixingGroupId !== undefined ? data.mixingGroupId : mixing.mixingGroupId,
  });
};

export const deleteMixing = async (id) => {
  const mixing = await Mixing.findByPk(id);
  if (!mixing) {
    throw new Error("Mixing not found");
  }
  await mixing.destroy();
};