import { html, LitElement } from "lit";

export class HeaderDataElement extends LitElement {
  static properties = {
    src: { type: String },
    page: { type: String },
    data: { state: true }
  };

  src?: string;
  page?: string;
  data?: any;

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  async hydrate(src: string) {
    const res = await fetch(src);
    const list = await res.json();
    this.data = this.page
      ? list.find((it: any) => it.key === this.page)
      : list[0];
  }

  render() {
    if (!this.data) return null;
    return html`
      <site-header
        logo-src=${this.data.logoSrc}
        site-title=${this.data.siteTitle}
      >
        <slot name="actions"></slot>
      </site-header>
    `;
  }
}
