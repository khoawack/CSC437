import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class SiteHeader extends LitElement {
  @property({ attribute: "logo-src" }) logoSrc?: string;
  @property({ attribute: "site-title" }) siteTitle?: string;

  override firstUpdated() {
    const checkbox = this.renderRoot.querySelector<HTMLInputElement>("#theme-checkbox");
    const text = this.renderRoot.querySelector<HTMLSpanElement>("#theme-text");
    if (!checkbox || !text) return;

    const apply = (isLight: boolean) => {
      document.body.classList.toggle("light-mode", isLight);
      localStorage.setItem("theme", isLight ? "light" : "dark");
      text.textContent = isLight ? " Dark mode" : " Light mode";
    };

    const saved = localStorage.getItem("theme");
    const isLight = saved === "light";
    checkbox.checked = isLight;
    apply(isLight);

    checkbox.addEventListener("change", () => apply(checkbox.checked));
  }

  override render() {
    return html`
      <header>
        ${this.logoSrc ? html`<img class="logo" src="${this.logoSrc}" alt="">` : null}
        <h1>${this.siteTitle ?? ""}</h1>
        <label id="theme-label">
          <input id="theme-checkbox" type="checkbox" autocomplete="off" />
          <span id="theme-text"> Light mode</span>
        </label>
      </header>
    `;
  }

  static styles = css`
    header{display:flex;align-items:center;padding:15px;background:var(--color-background)}
    .logo{height:60px;width:100px}
    h1{margin:0 1rem 0 0;flex:1;color:var(--color-support);font-family:var(--font-header);font-weight:var(--font-weight-bold);font-size:var(--font-size-heading)}
    #theme-label{margin-left:auto;font-family:var(--font-body);color:var(--color-support)}
  `;
}
