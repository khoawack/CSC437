import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer, Events } from "@calpoly/mustang";

export class SiteHeader extends LitElement {
  @property({ attribute: "logo-src" }) logoSrc?: string;
  @property({ attribute: "site-title" }) siteTitle?: string;

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

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

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"])
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`
      <a href="/login.html" @click=${(e: MouseEvent) => {
        e.preventDefault();
        window.location.href = "/login.html";
      }}>
        Sign In
      </a>
    `;
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
        <div class="user-info">
          ${this.loggedIn ? html`<span>User: , ${this.userid}</span>` : null}
        </div>
        <div class="auth-buttons">
          ${this.loggedIn ?
            this.renderSignOutButton() :
            this.renderSignInButton()
          }
        </div>
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      align-items: center;
      padding: 15px;
      background: var(--color-background);
      gap: 1rem;
    }
    
    .logo {
      height: 60px;
      width: 100px;
    }
    
    h1 {
      margin: 0 1rem 0 0;
      flex: 1;
      color: var(--color-support, white);
      font-family: var(--font-header, 'Plus Jakarta Sans', sans-serif);
      font-weight: var(--font-weight-bold, 700);
      font-size: var(--font-size-heading, 2rem);
    }
    
    .user-info {
      font-family: var(--font-body, 'Inter', sans-serif);
      color: var(--color-support, white);
      white-space: nowrap;
    }
    
    #theme-label {
      font-family: var(--font-body, 'Inter', sans-serif);
      color: var(--color-support, white);
      white-space: nowrap;
    }
    
    .auth-buttons {
      display: flex;
      align-items: center;
    }
    
    button {
      padding: 0.5rem 1rem;
      font-family: var(--font-body);
      color: white;
      background: #28DE80;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      font-size: 14px;
    }
    
    button:hover {
      opacity: 0.8;
    }
    
    a {
      padding: 0.5rem 1rem;
      font-family: var(--font-body);
      color: white;
      text-decoration: none;
      background: #28DE80;
      border-radius: 4px;
      display: inline-block;
      white-space: nowrap;
      font-size: 14px;
    }
    
    a:hover {
      opacity: 0.8;
    }
  `;
}
