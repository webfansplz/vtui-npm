import { detect, parseNi } from '@antfu/ni'
import { execaCommand } from 'execa'

export interface InstallPackageOptions {

  /**
   * Whether to DevDependencies
   * @default false
  */
  isDev?: boolean
  /**
  Current working directory.

  Using a `URL` is only supported in Node.js `14.18.0`, `16.14.0` or above.

  @default process.cwd()
  */
  cwd?: string
}

export async function installPackage(packages: string[], options: InstallPackageOptions = {}) {
  const {
    isDev = false,
    cwd = process.cwd(),
  } = options
  const agent = await detect({})

  const command = await parseNi(agent!, [...(isDev ? ['-D'] : []), ...packages])

  await execaCommand(command!, { stdio: 'pipe', encoding: 'utf-8', cwd })
}
