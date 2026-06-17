export const environments = {
  dev: {
    baseUrl: 'https://reqres.in',
    apiPath: '/api',
    thinkTime: 1,
  },
  staging: {
    baseUrl: 'https://reqres.in',
    apiPath: '/api',
    thinkTime: 2,
  },
  prod: {
    baseUrl: 'https://reqres.in',
    apiPath: '/api',
    thinkTime: 3,
  },
};

export function getEnv() {
  const env = __ENV.ENVIRONMENT || 'dev';
  if (!environments[env]) throw new Error(`Unknown environment: ${env}`);
  return environments[env];
}