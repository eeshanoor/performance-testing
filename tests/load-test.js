/**
 * Load Test — Normal expected traffic
 * Ramp: 0 -> 50 VUs over 2min, hold 5min, ramp down 2min
 */
import { check, sleep } from 'k6';
import { loginUser, getUsers, createUser, errorRate, thinkTime } from '../utils/helpers.js';
import { standardThresholds } from '../utils/thresholds.js';

export const options = {
  stages: [
    { duration: '2m', target: 10  },  // ramp up to 10 VUs
    { duration: '2m', target: 30  },  // ramp up to 30 VUs
    { duration: '5m', target: 50  },  // ramp up and hold 50 VUs
    { duration: '2m', target: 0   },  // ramp down
  ],
  thresholds: {
    ...standardThresholds,
    errors: ['rate<0.01'],
  },
  tags: { type: 'load' },
};

export default function () {
  const token = loginUser();

  thinkTime(1, 2);
  getUsers(Math.ceil(Math.random() * 2));

  thinkTime(1, 2);
  createUser(`User_${__VU}_${__ITER}`, 'QA Engineer');

  thinkTime(2, 4);
}