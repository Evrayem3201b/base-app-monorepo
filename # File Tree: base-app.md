# File Tree: base-app

**Generated:** 7/9/2026, 1:55:52 AM
**Root Path:** `/home/evrayem/Documents/base-app`

```
├── 📁 apps
│   ├── 📁 api
│   │   ├── 📁 drizzle
│   │   │   ├── 📁 meta
│   │   │   │   ├── ⚙️ 0000_snapshot.json
│   │   │   │   ├── ⚙️ 0001_snapshot.json
│   │   │   │   ├── ⚙️ 0002_snapshot.json
│   │   │   │   └── ⚙️ _journal.json
│   │   │   ├── 📄 0000_past_adam_warlock.sql
│   │   │   ├── 📄 0001_jittery_korath.sql
│   │   │   └── 📄 0002_steady_kitty_pryde.sql
│   │   ├── 📁 src
│   │   │   ├── 📁 db
│   │   │   │   └── 📄 schema.ts
│   │   │   ├── 📁 lib
│   │   │   │   ├── 📄 auth.ts
│   │   │   │   ├── 📄 authz.ts
│   │   │   │   ├── 📄 config.ts
│   │   │   │   ├── 📄 db.ts
│   │   │   │   ├── 📄 email.ts
│   │   │   │   └── 📄 permissions.ts
│   │   │   ├── 📁 middleware
│   │   │   │   └── 📄 auth.ts
│   │   │   ├── 📁 routes
│   │   │   │   └── 📄 hello.ts
│   │   │   ├── 📄 app.ts
│   │   │   └── 📄 index.ts
│   │   ├── ⚙️ .env.example
│   │   ├── ⚙️ .gitignore
│   │   ├── 📝 ReadMe.md
│   │   ├── 📄 drizzle.config.ts
│   │   ├── ⚙️ package.json
│   │   └── ⚙️ tsconfig.json
│   └── 📁 app
│       ├── 📁 .expo
│       │   ├── 📁 dev
│       │   │   └── 📁 logs
│       │   ├── 📁 types
│       │   │   └── 📄 router.d.ts
│       │   ├── 📁 web
│       │   ├── 📝 README.md
│       │   ├── ⚙️ devices.json
│       │   └── ⚙️ settings.json
│       ├── 📁 app
│       │   ├── 📁 (admin)
│       │   │   └── 📄 index.tsx
│       │   ├── 📁 (auth)
│       │   │   └── 📄 AuthScreen.tsx
│       │   ├── 📁 (tabs)
│       │   │   ├── 📄 _layout.tsx
│       │   │   ├── 📄 index.tsx
│       │   │   └── 📄 two.tsx
│       │   ├── 📄 +html.tsx
│       │   ├── 📄 +not-found.tsx
│       │   ├── 📄 _layout.tsx
│       │   └── 📄 modal.tsx
│       ├── 📁 assets
│       │   ├── 📁 fonts
│       │   │   └── 📄 SpaceMono-Regular.ttf
│       │   └── 📁 images
│       │       ├── 🖼️ android-icon-background.png
│       │       ├── 🖼️ android-icon-foreground.png
│       │       ├── 🖼️ android-icon-monochrome.png
│       │       ├── 🖼️ favicon.png
│       │       ├── 🖼️ icon.png
│       │       └── 🖼️ splash-icon.png
│       ├── 📁 components
│       │   ├── 📁 auth
│       │   │   ├── 📄 AdminDashboardLink.tsx
│       │   │   ├── 📄 AuthFooter.tsx
│       │   │   ├── 📄 AuthForm.tsx
│       │   │   ├── 📄 AuthHeader.tsx
│       │   │   ├── 📄 AuthInput.tsx
│       │   │   ├── 📄 AuthSocialProviders.tsx
│       │   │   ├── 📄 AuthVerificationNotice.tsx
│       │   │   ├── 📄 ChangePasswordForm.tsx
│       │   │   ├── 📄 DeleteAccountButton.tsx
│       │   │   └── 📄 SignOutButton.tsx
│       │   ├── 📄 ExternalLink.tsx
│       │   ├── 📄 StyledText.tsx
│       │   ├── 📄 Themed.tsx
│       │   ├── 📄 useClientOnlyValue.ts
│       │   ├── 📄 useClientOnlyValue.web.ts
│       │   ├── 📄 useColorScheme.ts
│       │   └── 📄 useColorScheme.web.ts
│       ├── 📁 constants
│       │   └── 📄 Colors.ts
│       ├── 📁 controllers
│       │   └── 📄 color.control.ts
│       ├── 📁 hooks
│       │   └── 📁 auth
│       │       ├── 📄 useAuthForm.ts
│       │       ├── 📄 useChangePasswordForm.ts
│       │       └── 📄 useUserData.ts
│       ├── 📁 lib
│       │   ├── 📁 auth
│       │   │   ├── 📄 api-client.ts
│       │   │   ├── 📄 auth-client.ts
│       │   │   ├── 📄 handleSignIn.ts
│       │   │   └── 📄 handleSignUp.ts
│       │   └── 📄 config.ts
│       ├── 📁 schemas
│       │   └── 📁 auth
│       │       └── 📄 auth.schema.ts
│       ├── ⚙️ .gitignore
│       ├── 📄 LICENSE
│       ├── ⚙️ app.json
│       ├── 📄 expo-env.d.ts
│       ├── ⚙️ package.json
│       └── ⚙️ tsconfig.json
├── 📁 packages
│   └── 📁 shared
│       ├── 📁 src
│       │   ├── 📁 constants
│       │   │   └── 📄 APP_DATA.ts
│       │   ├── 📁 schemas
│       │   │   └── 📄 users.schemas.ts
│       │   ├── 📁 types
│       │   │   └── 📄 user.type.ts
│       │   └── 📄 index.ts
│       ├── ⚙️ package.json
│       └── ⚙️ tsconfig.json
├── ⚙️ .gitignore
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
└── ⚙️ pnpm-workspace.yaml
```
