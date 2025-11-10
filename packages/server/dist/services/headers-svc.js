"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var headers_svc_exports = {};
__export(headers_svc_exports, {
  default: () => headers_svc_default
});
module.exports = __toCommonJS(headers_svc_exports);
var import_mongoose = require("mongoose");
const HeadersSchema = new import_mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    logoSrc: { type: String, required: false, trim: true },
    title: { type: String, required: true, trim: true }
  },
  { collection: "headers_collection" }
);
const HeadersModel = (0, import_mongoose.model)(
  "Header",
  HeadersSchema
);
function index() {
  return HeadersModel.find();
}
function get(key) {
  return HeadersModel.find({ key }).then((list) => list[0]).catch((err) => {
    throw `${key} Not Found`;
  });
}
var headers_svc_default = { index, get };
