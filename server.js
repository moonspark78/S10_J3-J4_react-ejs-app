import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import * as store from "./store.js"; // Import de notre store

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration Moteur de vue et fichiers statiques
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// --- ROUTES API (CRUD) ---
app.get("/api/v1/whisper", async (req, res) => {
  const whispers = await store.getAll();
  res.json(whispers);
});

app.get("/api/v1/whisper/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const whisper = await store.getById(id);
  res.json(whisper);
});

app.post("/api/v1/whisper", async (req, res) => {
  const newWhisper = await store.create(req.body.message);
  res.status(201).json(newWhisper);
});

app.put("/api/v1/whisper/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await store.updateById(id, req.body.message);
  res.sendStatus(200);
});

app.delete("/api/v1/whisper/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await store.deleteById(id);
  res.sendStatus(200);
});

// --- ROUTES VUE (Frontend) ---
app.get("/about", async (req, res) => {
  // Pour l'exercice, on récupère le nombre de whispers pour l'afficher
  const whispers = await store.getAll();
  res.render("about", { whisperCount: whispers.length, title: "About Whispering" });
});

export { app };

