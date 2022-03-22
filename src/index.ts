import express, { Application } from "express";
import cors from "cors";
import routesDir from "./api/v1/routes/index";

const app: Application = express();
const port = process.env.PORT || 3008;

// Load Cors
app.use(cors());

// Load routes
app.use("", routesDir);

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
