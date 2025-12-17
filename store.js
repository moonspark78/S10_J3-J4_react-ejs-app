import fs from "node:fs/promises";
import path from "node:path";

const filename = path.join(process.cwd(), "db.json");

const saveChanges = (data) => fs.writeFile(filename, JSON.stringify(data, null, 2));
const readData = async () => {
  try {
    const data = await fs.readFile(filename, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const getAll = readData;

export const getById = async (id) => {
  const data = await readData();
  return data.find((item) => item.id === id);
};

export const create = async (message) => {
  const data = await readData();
  const newItem = { message, id: data.length + 1 };
  await saveChanges(data.concat([newItem]));
  return newItem;
};

export const updateById = async (id, message) => {
  const data = await readData();
  const newData = data.map((current) => {
    if (current.id === id) {
      return { ...current, message };
    }
    return current;
  });
  await saveChanges(newData);
};

export const deleteById = async (id) => {
  const data = await readData();
  await saveChanges(data.filter((current) => current.id !== id));
};