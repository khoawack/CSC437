// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import Headers from "./services/headers-svc";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("db");

app.use(cors({
  origin: ["https://knguy578.csse.dev", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// with the other routes:
app.get("/header/:key", (req: Request, res: Response) => {
  const { key } = req.params;

  Headers.get(key).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res
      .status(404).send();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});