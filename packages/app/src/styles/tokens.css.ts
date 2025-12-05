import { css } from "lit";

export const tokens = css`
  * {
    --color-main: #28de80;
    --color-mainhover: #1d9457;
    --color-red: #da0000;
    --color-redhover: #a70000;
    --color-support: white;
    --color-background: rgb(10, 17, 25);
    --color-card: #131b23;
    --font-header: 'Plus Jakarta Sans', sans-serif;
    --font-body: 'Inter', sans-serif;

    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    --font-size-base: 16px;
    --font-size-heading: 2rem;
    --font-size-subheading: 1.25rem;
    --font-size-link: 2rem;

    --view-padding-vertical: 2rem;
    --view-card-width: 40vw;
    --view-card-min-height: 40vh;
    --view-card-border-radius: 10px;
    --view-card-padding: 1rem;
    --view-card-heading-padding: 15px;
    --view-list-padding-top: 20px;
    --view-list-line-height: 40px;
  }
`;
