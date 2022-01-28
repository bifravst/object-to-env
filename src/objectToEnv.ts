import * as changeCase from 'change-case'
import * as os from 'os'

const toEnvKey = (key: string, prefix?: string) =>
	`${prefix ?? ''}${changeCase.constantCase(key)}`

const toValue = (value: string, quote = '"'): string =>
	`${quote}${value.replace(new RegExp(quote, 'g'), `\\${quote}`)}${quote}`

/**
 * Convert an object to environment variable definitions
 */
export const objectToEnv = (
	obj: Record<string, any>,
	prefix?: string,
): string =>
	Object.entries(obj).reduce(
		(env, [OutputKey, OutputValue]) =>
			`${env}${toEnvKey(OutputKey || '', prefix)}=${toValue(OutputValue)}${
				os.EOL
			}`,
		'',
	)
