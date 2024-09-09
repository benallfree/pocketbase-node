# process

`process` is designed as a drop-in replacement for Node.js's `process` module, tailored for use within PocketBase. Its purpose is to simplify porting Node.js modules into a PocketBase environment. While PocketBase includes Goja's Node compatibility layer, certain modules are not available out of the box — `process` being one of them.

To use it, simply replace `require('process')` with `require('@pocketbase-node/process')` in your code, and it should work seamlessly.
