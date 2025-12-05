import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Headers } from "../../server/src/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  switch (message[0]) {
    case "header/request": {
      const { key } = message[1];
      if (model.header) break;
      return [
        model,
        requestHeader(key, user)
          .then((header) => ["header/save", { key, header }] as Msg)
          .catch((error) => {
            console.error("Failed to load header:", error);
            return ["header/save", { key, header: {} as Headers }] as Msg;
          })
      ];
    }
    case "header/save": {
      const { header } = message[1];
      return { ...model, header };
    }
    default: {
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
    }
  }
  return model;
}

function requestHeader(key: string, user: Auth.User): Promise<Headers> {
  return fetch(`/api/header/${key}`, {
    headers: Auth.headers(user)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`Failed to load header: ${response.status}`);
    })
    .then((json: unknown) => {
      const header = json as Headers;
      return header;
    });
}
