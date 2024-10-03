## 👋 magic-debug

1. install dependencies (`pnpm install`)
2. run the app using scripts from package.json (`pnpm ios` or `pnpm android`)
3. check logs in termial, examples:

```
# android
LOG  [2024-10-03T18:30:29.631Z][debug][system] bootstrap
LOG  [2024-10-03T18:30:29.632Z][debug][auth] getSession called
LOG  [2024-10-03T18:30:37.653Z][error][auth] getSession error {"reason":"Magic RPC Error: [-32603] Internal error: User denied account access."}

# ios
LOG  [2024-10-03T18:31:33.421Z][debug][system] bootstrap
LOG  [2024-10-03T18:31:33.422Z][debug][auth] getSession called
LOG  [2024-10-03T18:31:42.927Z][debug][auth] magicUserInfo received {"magicUserInfo":{"issuer":"did:ethr:0x29620...","publicAddress":"E8PPKvzP...","email":"my@email.com" "phoneNumber":null,"isMfaEnabled":false,"recoveryFactors":[]}}
```