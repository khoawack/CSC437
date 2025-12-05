// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import Headers from "./services/headers-svc";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);

app.use(express.static(staticDir));

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

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