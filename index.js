import { app } from "./server.js";

const port = 3002;

app.listen(port, () => {
  console.log(`Whispering is running on http://localhost:${port}`);
});

