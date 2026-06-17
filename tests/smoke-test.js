/**
 * Smoke Test — Quick baseline sanity check
 * 1 VU, 1 minute, verifies core endpoints work
 */
import { check, sleep } from 'k6';
import http from 'k6/http';
import { loginUser, getUsers, createUser, errorRate } from '../utils/helpers.js';
import { standardThresholds } from '../utils/thresholds.js';

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    ...standardThresholds,
    errors: ['rate<0.01'],
  },
  tags: { type: 'smoke' },
};

export default function () {
  // 1. Health check
  const health = http.get('https://reqres.in/api/users/1');
  check(health, { 'API is up': r => r.status === 200 });

  sleep(1);

  // 2. Auth flow
  const token = loginUser();
  check(token, { 'token received': t => t && t.length > 0 });

  sleep(1);

  // 3. Read users
  getUsers(1);
  getUsers(2);

  sleep(1);

  // 4. Create user
  createUser('Eesha Noor', 'SDET');

  sleep(2);
}