// Local stand-ins for Node's `fs` types. PocketBase's JSVM has no Node, so the
// published types must not import from 'fs'.
export type PathLike = string | { toString(): string }
export type Mode = number
export type MakeDirectoryOptions = { recursive?: boolean; mode?: Mode }
export type WriteFileOptions =
  | { mode?: Mode; encoding?: string | null; flag?: string }
  | string
  | null

function byteArrayToUtf8(byteArray: number[]) {
  let utf8String = ''
  for (let i = 0; i < byteArray.length; i++) {
    utf8String += String.fromCharCode(byteArray[i]!)
  }
  return decodeURIComponent(escape(utf8String)) // Handle multi-byte characters
}

export const readFileSync = (path: string, options?: any) => {
  if (typeof path !== 'string') {
    throw new Error('path must be a string')
  }
  const res = $os.readFile(path)
  if (typeof res === 'string') {
    return res
  }
  const s = byteArrayToUtf8(res)
  return s
}

export const existsSync = (
  pathLike: string,
  fileType: 'dir' | 'file' | 'both' = 'both'
) => {
  const isDir = (() => {
    try {
      $os.readDir(pathLike)
      return true
    } catch {
      return false
    }
  })()
  const isFile = (() => {
    if (isDir) {
      return false
    }
    try {
      return $filesystem.fileFromPath(pathLike) !== null
    } catch {
      return false
    }
  })()
  // console.log(JSON.stringify({ path, isDir, isFile }, null, 2))
  return fileType === 'file'
    ? isFile
    : fileType === 'dir'
    ? isDir
    : isFile || isDir
}

export const writeFileSync = (
  path: string,
  data: string,
  options?: WriteFileOptions
): void => {
  if (typeof path !== 'string') {
    throw new Error('path must be a string')
  }
  if (typeof data !== 'string') {
    throw new Error('data must be a string')
  }
  const mode = (() => {
    if (options && typeof options === 'object' && 'mode' in options) {
      return options.mode
    }
    return 0o644
  })()
  // @ts-ignore
  $os.writeFile(path, data, mode)
}

export function mkdirSync(
  path: PathLike,
  options: MakeDirectoryOptions & {
    recursive: true
  }
): string | undefined
export function mkdirSync(
  path: PathLike,
  options?:
    | Mode
    | (MakeDirectoryOptions & {
        recursive?: false | undefined
      })
    | null
): void
export function mkdirSync(
  path: PathLike,
  options?: Mode | MakeDirectoryOptions | null
): string | undefined {
  const mode = (() => {
    if (options && typeof options === 'object' && 'mode' in options) {
      return options.mode
    }
    return 0o755
  })()
  // @ts-ignore
  $os.mkdirAll(path.toString(), mode)
  return
}
