/**
 * Stress Test — Find the breaking point
 * Continuously ramp up until system degrades or fails
 */
import { loginUser, getUsers, errorRate, thinkTime } from '../utils/helpers.js';

export const options = {
  stages: [
    { duration: '2m', target: 50  },
    { duration: '3m', target: 100 },
    { duration: '3m', target: 150 },
    { duration: '3m', target: 200 },
    { duration: '3m', target: 300 },
    { duration: '2m', target: 0   },  // recovery
  ],
  thresholds: {
    http_req_duration: ['p(99)<2000'],
    http_req_failed:   ['rate<0.10'],   // allow higher error rate in stress
  },
  tags: { type: 'stress' },
};

export default function () {
  loginUser();
  thinkTime(0.5, 1);
  getUsers();
  thinkTime(1, 2);
}