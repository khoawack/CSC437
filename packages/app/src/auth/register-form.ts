import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css.ts";
import headings from "../styles/headings.css.ts";

interface RegisterFormData {
  username?: string;
  password?: string;
}

export class RegisterFormElement extends LitElement {

  @state()
  formData: RegisterFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  @state()
  success?: string;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username &&
      this.formData.password);
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Register
          </button>
        </slot>
        ${this.success ? html`<p class="success">${this.success}</p>` : ''}
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
      </form>
    `;
  }

  static styles = [
    reset.styles,
    headings.styles,
    css`
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }

      button {
        padding: 0.75rem 1.5rem;
        background-color: var(--color-main, #28de80);
        color: var(--color-background, rgb(10, 17, 25));
        border: none;
        border-radius: 5px;
        font-family: var(--font-body, 'Inter', sans-serif);
        font-size: 1rem;
        font-weight: var(--font-weight-medium, 500);
        cursor: pointer;
        transition: background-color 0.2s;
      }

      button:hover:not(:disabled) {
        background-color: var(--color-mainhover, #1d9457);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .error:not(:empty) {
        color: var(--color-red, #da0000);
        border: 1px solid var(--color-red, #da0000);
        padding: var(--size-spacing-medium, 1rem);
        margin-top: var(--size-spacing-medium, 1rem);
        border-radius: 5px;
        background-color: rgba(218, 0, 0, 0.1);
      }

      .success:not(:empty) {
        color: var(--color-main, #28de80);
        border: 1px solid var(--color-main, #28de80);
        padding: var(--size-spacing-medium, 1rem);
        margin-top: var(--size-spacing-medium, 1rem);
        border-radius: 5px;
        background-color: rgba(40, 222, 128, 0.1);
      }
    `
  ];

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;

    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();
    this.error = undefined;
    this.success = undefined;

    if (this.canSubmit) {
      fetch(
        this?.api || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.formData)
        }
      )
      .then((res) => {
        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);
        if (res.status === 201) {
          return res.json();
        } else if (res.status !== 200) {
          return res.text().then(text => {
            console.log("Error response body:", text);
            throw new Error(`Registration failed: ${res.status} - ${text}`);
          });
        }
        return res.json();
      })
      .then((json: object) => {
        const { token } = json as { token: string };
        console.log("Received token:", token);
        
        this.success = "Registration successful! Signing you in...";
        
        const customEvent = new CustomEvent(
          'auth:message', {
            bubbles: true,
            composed: true,
            detail: [
              'auth/signin',
              { token, redirect: this.redirect }
            ]
          }
        );
        this.dispatchEvent(customEvent);
      })
      .catch((error: Error) => {
        console.log(error);
        this.error = error.toString();
      });
    }
  }
}
