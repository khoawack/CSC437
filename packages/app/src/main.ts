import { define, Auth, History, Switch, Store } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { SiteHeader } from "./site-header.ts";
import { HeaderDataElement} from "./header-data.ts"
import { HomeViewElement } from "./views/home-view.ts";
import { TopicViewElement } from "./views/topic-view.ts";

const routes = [
  // Home/Landing page - topic selection
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  
  // One Piece - game mode selection
  {
    path: "/app/one-piece",
    view: () => html`
      <topic-view topic="one-piece"></topic-view>
    `
  },
  
  // One Piece - Higher/Lower game
  {
    path: "/app/one-piece/higher-lower",
    view: () => html`
      <header-data src="/data/headers.json" page="op-hilo"></header-data>
      <div class="body">
        <h2>Guess the higher/lower value. Try to get the longest streak!</h2>
        <one-piece-higher-lower-view></one-piece-higher-lower-view>
      </div>
    `
  },
  
  // One Piece - Value Guess game
  {
    path: "/app/one-piece/value-guess",
    view: () => html`
      <header-data src="/data/headers.json" page="op-value"></header-data>
      <div class="body">
        <one-piece-value-guess-view></one-piece-value-guess-view>
      </div>
    `
  },
  
  // Pokemon - game mode selection
  {
    path: "/app/pokemon",
    view: () => html`
      <topic-view topic="pokemon"></topic-view>
    `
  },
  
  // Pokemon - Higher/Lower game
  {
    path: "/app/pokemon/higher-lower",
    view: () => html`
      <header-data src="/data/headers.json" page="pk-hilo"></header-data>
      <div class="body">
        <h2>Guess the higher/lower value. Try to get the longest streak!</h2>
        <pokemon-higher-lower-view></pokemon-higher-lower-view>
      </div>
    `
  },
  
  // Pokemon - Value Guess game
  {
    path: "/app/pokemon/value-guess",
    view: () => html`
      <header-data src="/data/headers.json" page="pk-value"></header-data>
      <div class="body">
        <pokemon-value-guess-view></pokemon-value-guess-view>
      </div>
    `
  },
  
  // Root redirect to /app
  {
    path: "/",
    redirect: "/app"
  }
];

define({ 
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore extends Store.Provider<Model, Msg> {
        constructor() {
            super(update, init, "blazing:auth");
        }
    },
    "site-header": SiteHeader,
    "header-data": HeaderDataElement,
    "home-view": HomeViewElement,
    "topic-view": TopicViewElement,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "blazing:history", "blazing:auth");
            }
        }
    });