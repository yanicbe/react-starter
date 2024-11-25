# Getting Started with Besson IT Solutions Starter

Clone with: `npx create-next-app@latest my-new-react-app -e https://github.com/yanicbe/react-starter`

## Getting Started

[ ] Development

- [ ] Auth0 settings
- [ ] .env variables
- [ ] setup routing
- [ ] setup interfaces
- [ ] styling:
  - [ ] change colors in index.css
  - [ ] paste images in public folder (logo, favicon, webclip)
- [ ] components:
  - [ ] mail-verification.tsx
  - [ ] support/page.tsx
  - [ ] register/page.tsx
  - [ ] register/reset-password.tsx (optional - for register process)
  - [ ] register/informations/page.tsx
  - [ ] navigation/sidebar.tsx
  - [ ] home/page.tsx
  - [ ] error/page-not-found.tsx
  - [ ] error/error-boundary.tsx
  - [ ] error/no-access.tsx

##

## Auth0 Settings:

### Applications -> Default App -> Settings

- [ ] application login URL
- [ ] allowed callback URLs
- [ ] allowed logout URLs
- [ ] allowed web origins
- [ ] allow cross origin authentication
- [ ] allowed origins
- [ ] cross origin verification fallback URL

### Applications -> Default App -> Credentials

- [ ] Authentication Method - None

### Advanced Settings

#### Grant types

- [ ] Implicit
- [ ] Authorization Code
- [ ] Refresh Token
- [ ] Password

##

## .env variables:

- [ ] REACT_APP_NODE_ENV:
  - dev
  - prod
- [ ] REACT_APP_AUTH0_ID
  - Auth0 -> Applications -> Default App -> Client ID
- [ ] REACT_APP_API
  - API URL
- [ ] REACT_APP_AUTH0_DOMAIN
  - Auth0 -> Applications -> Default App -> Domain
- [ ] REACT_APP_AUTH0_AUDIENCE
  - Auth0 -> Applications -> APIs -> Custom API -> API audience
- [ ] REACT_APP_INITIALIZED
  - true when every .env variable is set
