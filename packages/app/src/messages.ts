// src/messages.ts
import { Headers } from "../../server/src/models";

export type Msg =
  | ["header/request", { key: string }]
 // etc for remaining messages dispatched from Views...
  | Cmd
  ;

type Cmd =
  | ["header/save", { key: string; header: Headers }];
