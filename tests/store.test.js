import { getAll, create, updateById, deleteById } from "../store.js";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.join(process.cwd(), "db.json");
const restoreDb = () => fs.writeFileSync(dbPath, JSON.stringify([]));

// ... insère ici le reste de tes tests (describe/it) ...
// Exemple simple :
describe("store", () => {
    beforeEach(restoreDb);
    afterAll(restoreDb);

    it("should return empty array initially", async () => {
        const data = await getAll();
        expect(data).toEqual([]);
    });

    it("should create a whisper", async () => {
        await create("Hello World");
        const data = await getAll();
        expect(data).toHaveLength(1);
        expect(data[0].message).toBe("Hello World");
    });
});