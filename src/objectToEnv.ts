import * as changeCase from 'change-case'
import * as os from 'os'

const toEnvKey = (key: string, prefix?: string) =>
	`${prefix ?? ''}${changeCase.constantCase(key)}`

/**
 * Convert an object to environment variable definitions
 */
export const objectToEnv = (obj: object, prefix?: string) =>
	Object.entries(obj).reduce(
		(env, [OutputKey, OutputValue]) =>
			`${env}${toEnvKey(OutputKey || '', prefix)}=${OutputValue}${os.EOL}`,
		'',
	)
