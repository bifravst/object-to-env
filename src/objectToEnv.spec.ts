import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import * as os from 'os'
import { objectToEnv } from './objectToEnv.js'

void describe('objectToEnv()', () => {
	void it('should convert an object to environment variable definitions', () => {
		assert.equal(
			objectToEnv({
				websiteBucketName: 'asset-tracker-websitbucketc74c6fbf-e126q3sws4eq',
				userPoolClientId: '7mfbudbt5eq56kgo2244sa9kc8',
				mqttEndpoint: 'a34x44yyrk96tg-ats.iot.eu-central-1.amazonaws.com',
				userPoolId: 'eu-central-1_KBMdKxWIt',
				identityPoolId: 'eu-central-1:5b979419-01d8-498a-a024-c344ac2a3301',
				websiteDomainName:
					'asset-tracker-websitbucketc74c6fbf-e126q3sws4eq.s3.eu-central-1.amazonaws.com',
			}),

			[
				'WEBSITE_BUCKET_NAME="asset-tracker-websitbucketc74c6fbf-e126q3sws4eq"',
				'USER_POOL_CLIENT_ID="7mfbudbt5eq56kgo2244sa9kc8"',
				'MQTT_ENDPOINT="a34x44yyrk96tg-ats.iot.eu-central-1.amazonaws.com"',
				'USER_POOL_ID="eu-central-1_KBMdKxWIt"',
				'IDENTITY_POOL_ID="eu-central-1:5b979419-01d8-498a-a024-c344ac2a3301"',
				'WEBSITE_DOMAIN_NAME="asset-tracker-websitbucketc74c6fbf-e126q3sws4eq.s3.eu-central-1.amazonaws.com"',
				'',
			].join(os.EOL),
		)
	})
	void it('should convert an object to a React App environment', () => {
		assert.equal(
			objectToEnv(
				{
					websiteBucketName: 'asset-tracker-websitbucketc74c6fbf-e126q3sws4eq',
					userPoolClientId: '7mfbudbt5eq56kgo2244sa9kc8',
					mqttEndpoint: 'a34x44yyrk96tg-ats.iot.eu-central-1.amazonaws.com',
					userPoolId: 'eu-central-1_KBMdKxWIt',
					identityPoolId: 'eu-central-1:5b979419-01d8-498a-a024-c344ac2a3301',
					websiteDomainName:
						'asset-tracker-websitbucketc74c6fbf-e126q3sws4eq.s3.eu-central-1.amazonaws.com',
				},
				{ prefix: 'REACT_APP_' },
			),

			[
				'REACT_APP_WEBSITE_BUCKET_NAME="asset-tracker-websitbucketc74c6fbf-e126q3sws4eq"',
				'REACT_APP_USER_POOL_CLIENT_ID="7mfbudbt5eq56kgo2244sa9kc8"',
				'REACT_APP_MQTT_ENDPOINT="a34x44yyrk96tg-ats.iot.eu-central-1.amazonaws.com"',
				'REACT_APP_USER_POOL_ID="eu-central-1_KBMdKxWIt"',
				'REACT_APP_IDENTITY_POOL_ID="eu-central-1:5b979419-01d8-498a-a024-c344ac2a3301"',
				'REACT_APP_WEBSITE_DOMAIN_NAME="asset-tracker-websitbucketc74c6fbf-e126q3sws4eq.s3.eu-central-1.amazonaws.com"',
				'',
			].join(os.EOL),
		)
	})
	void it('should escape the quote in values', () =>
		assert.equal(
			objectToEnv({
				quotedValue: 'some value with " in it',
			}),
			['QUOTED_VALUE="some value with \\" in it"', ''].join(os.EOL),
		))
	void it('should allow to turn off quoting', () =>
		assert.equal(
			objectToEnv(
				{
					quotedValue: 'some value with " in it',
				},
				{ quote: '' },
			),
			['QUOTED_VALUE=some value with " in it', ''].join(os.EOL),
		))
})
