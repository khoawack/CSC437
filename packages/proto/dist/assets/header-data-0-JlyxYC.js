import{a as g,x as l,i as m,n as p}from"./property-BNJUEmlI.js";var u=Object.defineProperty,f=(h,t,o,r)=>{for(var e=void 0,s=h.length-1,a;s>=0;s--)(a=h[s])&&(e=a(t,o,e)||e);return e&&u(t,o,e),e};const c=class c extends g{firstUpdated(){const t=this.renderRoot.querySelector("#theme-checkbox"),o=this.renderRoot.querySelector("#theme-text");if(!t||!o)return;const r=a=>{document.body.classList.toggle("light-mode",a),localStorage.setItem("theme",a?"light":"dark"),o.textContent=a?" Dark mode":" Light mode"},s=localStorage.getItem("theme")==="light";t.checked=s,r(s),t.addEventListener("change",()=>r(t.checked))}render(){return l`
      <header>
        ${this.logoSrc?l`<img class="logo" src="${this.logoSrc}" alt="">`:null}
        <h1>${this.siteTitle??""}</h1>
        <label id="theme-label">
          <input id="theme-checkbox" type="checkbox" autocomplete="off" />
          <span id="theme-text"> Light mode</span>
        </label>
      </header>
    `}};c.styles=m`
    header{display:flex;align-items:center;padding:15px;background:var(--color-background)}
    .logo{height:60px;width:100px}
    h1{margin:0 1rem 0 0;flex:1;color:var(--color-support);font-family:var(--font-header);font-weight:var(--font-weight-bold);font-size:var(--font-size-heading)}
    #theme-label{margin-left:auto;font-family:var(--font-body);color:var(--color-support)}
  `;let i=c;f([p({attribute:"logo-src"})],i.prototype,"logoSrc");f([p({attribute:"site-title"})],i.prototype,"siteTitle");const n=class n extends g{connectedCallback(){super.connectedCallback(),this.src&&this.hydrate(this.src)}async hydrate(t){const r=await(await fetch(t)).json();this.data=this.page?r.find(e=>e.key===this.page):r[0]}render(){return this.data?l`
      <site-header
        logo-src=${this.data.logoSrc}
        site-title=${this.data.siteTitle}
      >
        <slot name="actions"></slot>
      </site-header>
    `:null}};n.properties={src:{type:String},page:{type:String},data:{state:!0}};let d=n;export{d as H,i as S};
