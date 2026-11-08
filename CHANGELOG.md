# pocketbase-node

## 0.0.4

### Patch Changes

- The published types no longer import from Node's `fs`, so projects that only use `pocketbase-jsvm` types (no `@types/node`) typecheck cleanly
- Removed the duplicate `process` declaration, which `pocketbase-jsvm` now provides
- Updated `pocketbase-jsvm` to 0.40.60001

## 0.0.3

### Patch Changes

- Support 'both' for existsSync
- Add type guards for readFileSync and writeFileSync
- 0506955: Enhanced Typescript typings

## 0.0.2

### Patch Changes

- package.json fixes

## 0.0.2-rc.0

### Patch Changes

- package.json fixes

## 0.0.1

### Patch Changes

- Initial commit
