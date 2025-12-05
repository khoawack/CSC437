import express, { Request, Response } from "express";
import { Headers } from "../models";
import HeaderService from "../services/headers-svc";

const router = express.Router();

router.get("/:key", (req: Request, res: Response) => {
  const { key } = req.params;

  HeaderService.get(key)
    .then((header: Headers) => res.json(header))
    .catch((err) => res.status(404).send({ error: err }));
});

export default router;