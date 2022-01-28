import * as changeCase from 'change-case'
import * as os from 'os'

const toEnvKey = (key: string, prefix?: string) =>
	`${prefix ?? ''}${changeCase.constantCase(key)}`

const toValue = (value: string, quote: string): string =>
	quote.length > 0
		? `${quote}${value.replace(new RegExp(quote, 'g'), `\\${quote}`)}${quote}`
		: value

/**
 * Convert an object to environment variable definitions
 */
export const objectToEnv = (
	obj: Record<string, any>,
	options?: {
		prefix?: string
		quote?: string
	},
): string => {
	const prefix = options?.prefix
	const quote = options?.quote ?? '"'
	return Object.entries(obj).reduce(
		(env, [OutputKey, OutputValue]) =>
			`${env}${toEnvKey(OutputKey || '', prefix)}=${toValue(
				OutputValue,
				quote,
			)}${os.EOL}`,
		'',
	)
}
