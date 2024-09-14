/**
 *
 * @param {string[]} cmdArr This is NONSTANDARD. It is an array of strings that will be joined with spaces to form the command to execute rather than a simple string like nodejs
 * @returns {string}
 */
const execSync = (cmdArr: string[]) => {
  // prepare the command to execute
  const [cmd, ...args] = cmdArr
  const _cmd = $os.cmd(cmd!, ...args)

  // execute the command and return its standard output as string
  const charOut = _cmd.output() as number[]
  const output = String.fromCharCode(...charOut)
  return output
}

export { execSync }
