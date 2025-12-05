// src/model.ts
import { Headers } from "../../server/src/models";

export interface Model {
  header?: Headers;
}

export const init: Model = {};
