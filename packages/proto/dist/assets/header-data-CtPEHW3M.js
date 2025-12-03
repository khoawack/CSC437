import{b as p,O as b,e as m,x as i,i as v,n as g,r as f}from"./state-Dq83KY5o.js";var y=Object.defineProperty,l=(h,t,e,r)=>{for(var o=void 0,s=h.length-1,a;s>=0;s--)(a=h[s])&&(o=a(t,e,o)||o);return o&&y(t,e,o),o};const c=class c extends p{constructor(){super(...arguments),this._authObserver=new b(this,"blazing:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:e}=t;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}firstUpdated(){const t=this.renderRoot.querySelector("#theme-checkbox"),e=this.renderRoot.querySelector("#theme-text");if(!t||!e)return;const r=a=>{document.body.classList.toggle("light-mode",a),localStorage.setItem("theme",a?"light":"dark"),e.textContent=a?" Dark mode":" Light mode"},s=localStorage.getItem("theme")==="light";t.checked=s,r(s),t.addEventListener("change",()=>r(t.checked))}renderSignOutButton(){return i`
      <button
        @click=${t=>{m.relay(t,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return i`
      <a href="/login.html">
        Sign In
      </a>
    `}render(){return i`
      <header>
        ${this.logoSrc?i`<img class="logo" src="${this.logoSrc}" alt="">`:null}
        <h1>${this.siteTitle??""}</h1>

        <label id="theme-label">
          <input id="theme-checkbox" type="checkbox" autocomplete="off" />
          <span id="theme-text"> Light mode</span>
        </label>
        <div class="user-info">
          ${this.loggedIn?i`<span>Hello, ${this.userid}</span>`:null}
        </div>
        <div class="auth-buttons">
          ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
        </div>
      </header>
    `}};c.styles=v`
    header{display:flex;align-items:center;padding:15px;background:var(--color-background);gap:1rem}
    .logo{height:60px;width:100px}
    h1{margin:0 1rem 0 0;flex:1;color:var(--color-support);font-family:var(--font-header);font-weight:var(--font-weight-bold);font-size:var(--font-size-heading)}
    .user-info{font-family:var(--font-body);color:var(--color-support);white-space:nowrap}
    #theme-label{font-family:var(--font-body);color:var(--color-support);white-space:nowrap}
    .auth-buttons{display:flex;align-items:center}
    button{padding:0.5rem 1rem;font-family:var(--font-body);color:white;background:#007bff;border:none;border-radius:4px;cursor:pointer;white-space:nowrap;font-size:14px}
    button:hover{opacity:0.8}
    a{padding:0.5rem 1rem;font-family:var(--font-body);color:white;text-decoration:none;background:#007bff;border-radius:4px;display:inline-block;white-space:nowrap;font-size:14px}
    a:hover{opacity:0.8}
  `;let n=c;l([g({attribute:"logo-src"})],n.prototype,"logoSrc");l([g({attribute:"site-title"})],n.prototype,"siteTitle");l([f()],n.prototype,"loggedIn");l([f()],n.prototype,"userid");const d=class d extends p{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}async hydrate(t){const r=await(await fetch(t)).json();this.data=this.page?r.find(o=>o.key===this.page):r[0]}render(){return this.data?i`
      <site-header
        logo-src=${this.data.logoSrc}
        site-title=${this.data.siteTitle}
      >
        <slot name="actions"></slot>
      </site-header>
    `:null}};d.properties={src:{type:String},page:{type:String},data:{state:!0}};let u=d;export{u as H,n as S};
