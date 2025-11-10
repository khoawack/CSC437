import { Schema, model } from "mongoose";
import {Headers} from "../models/headers";

const HeadersSchema = new Schema<Headers>({
    key: {type: String, required: true, trim: true},
    logoSrc: {type: String, required: false, trim:true},
    title: {type: String, required: true, trim: true}
},
{collection : "headers_collection"}
)

const HeadersModel = model<Headers>(
  "Header",
  HeadersSchema
);

function index(): Promise<Headers[]> {
  return HeadersModel.find();
}

function get(key: String): Promise<Headers> {
  return HeadersModel.find({ key })
    .then((list) => list[0])
    .catch((err) => {
      throw `${key} Not Found`;
    });
}

export default { index, get };