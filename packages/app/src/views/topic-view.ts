import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class TopicViewElement extends LitElement {
  @property()
  topic?: string;

  get headerPage() {
    // "one-piece" -> "onepiece", "pokemon" -> "pokemon"
    return this.topic?.replace("-", "");
  }

  render() {
    if (!this.topic) return html`<p>Loading...</p>`;

    return html`
      <header-data src="/data/headers.json" page="${this.headerPage}"></header-data>
      <div class="body">
        <div class="card">
          <h2>Select a game mode</h2>
          <ul>
            <li><a href="/app/${this.topic}/value-guess">Value Guesser</a></li>
            <li><a href="/app/${this.topic}/higher-lower">Higher or Lower</a></li>
          </ul>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .body {
      background-color: var(--color-background);
      display: flex;
      align-items: center;
      justify-items: center;
      flex-direction: column;
      font-family: var(--font-body);
      min-height: 100%;
      padding: var(--view-padding-vertical) 0;
    }

    ul {
      padding-top: var(--view-list-padding-top);
      padding-left: 0;
      list-style-type: none;
      line-height: var(--view-list-line-height);
      text-align: center;
      margin: 0;
    }

    li {
      text-align: center;
    }

    a {
      color: var(--color-main);
      font-size: var(--font-size-link);
      list-style-type: none;
      text-decoration: none;
      display: inline-block;
    }

    a:hover {
      color: var(--color-mainhover);
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: var(--view-card-width);
      min-height: var(--view-card-min-height);
      border-radius: var(--view-card-border-radius);
      background-color: var(--color-card);
      padding: var(--view-card-padding);
      box-sizing: border-box;
    }

    .card h2 {
      padding: var(--view-card-heading-padding);
      color: var(--color-support);
      font-size: var(--font-size-heading);
    }
  `;
}
