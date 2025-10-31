import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class SiteHeader extends LitElement {
  @property({ attribute: "logo-src" }) logoSrc?: string;
  @property({ attribute: "site-title" }) siteTitle?: string;

  override render() {
    return html`
      <header>
        ${this.logoSrc ? html`<img class="logo" src="${this.logoSrc}" alt="">` : null}
        <h1>${this.siteTitle ?? ""}</h1>
        <!-- Anything you pass with slot="actions" (e.g., your theme toggle)
             stays in the light DOM so your existing script.js keeps working -->
        <slot name="actions"></slot>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 15px;
      background-color: var(--color-background);
    }
    .logo { height: 60px; width: 60px; }
    h1 {
      color: var(--color-support);
      font-family: var(--font-header);
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-heading);
      padding-left: 5px;
      margin: 0;
      flex: 1;
    }
    ::slotted(label) {
      margin-left: auto;
      font-family: var(--font-body);
      color: var(--color-support);
    }
  `;
}
