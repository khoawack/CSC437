import{n as h,i as l,a as c,x as p,d as g,b as m}from"./property-BNJUEmlI.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function u(i){return h({...i,state:!0,attribute:!1})}const b=l`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
  }
  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,y={styles:b},v=l`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-display);
    line-height: var(--font-line-height-display);
  }
  h1 {
    font-size: var(--size-type-xxlarge);
    font-style: oblique;
    line-height: 1;
    font-weight: var(--font-weight-bold);
  }
  h2 {
    font-size: var(--size-type-xlarge);
    font-weight: var(--font-weight-bold);
  }
  h3 {
    font-size: var(--size-type-large);
    font-weight: var(--font-weight-normal);
  }
  h4 {
    font-size: var(--size-type-mlarge);
    font-weight: var(--font-weight-bold);
  }
  h5 {
    font-size: var(--size-type-body);
    font-weight: var(--font-weight-bold);
  }
  h6 {
    font-size: var(--size-type-body);
    font-weight: var(--font-weight-normal);
    font-style: italic;
  }
`,w={styles:v};var z=Object.defineProperty,n=(i,o,t,s)=>{for(var e=void 0,a=i.length-1,d;a>=0;a--)(d=i[a])&&(e=d(o,t,e)||e);return e&&z(o,t,e),e};const f=class f extends c{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return p`
      <form
        @change=${o=>this.handleChange(o)}
        @submit=${o=>this.handleSubmit(o)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(o){const t=o.target,s=t?.name,e=t?.value,a=this.formData;switch(s){case"username":this.formData={...a,username:e};break;case"password":this.formData={...a,password:e};break}}handleSubmit(o){o.preventDefault(),this.canSubmit&&fetch(this?.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>(console.log("Response status:",t.status),console.log("Response headers:",t.headers),t.status!==200?t.text().then(s=>{throw console.log("Error response body:",s),new Error(`Login failed: ${t.status} - ${s}`)}):t.json())).then(t=>{const{token:s}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:s,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};f.styles=[y.styles,w.styles,l`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
  `];let r=f;n([u()],r.prototype,"formData");n([h()],r.prototype,"api");n([h()],r.prototype,"redirect");n([u()],r.prototype,"error");g({"mu-auth":m.Provider,"login-form":r});
