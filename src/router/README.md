### Main router directive

To implement a router guard:

```js
// router guard
router.beforeResolve( (to, from) => {
   if (to.meta.Auth && !Authenticated) {
     return false
   }
   
   return true
})
```