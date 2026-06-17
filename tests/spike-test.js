/**
 * Spike Test — Sudden surge of traffic
 * Simulate flash sale / viral event
 */
import { loginUser, getUsers, errorRate, thinkTime } from '../utils/helpers.js';

export const options = {
  stages: [
    { duration: '10s', target: 10  },  // normal load
    { duration: '1m',  target: 10  },  // hold
    { duration: '10s', target: 500 },  // SPIKE!
    { duration: '3m',  target: 500 },  // hold spike
    { duration: '10s', target: 10  },  // back to normal
    { duration: '3m',  target: 10  },  // recovery
    { duration: '10s', target: 0   },  // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],  // relaxed for spike
    http_req_failed:   ['rate<0.20'],
  },
  tags: { type: 'spike' },
};

export default function () {
  loginUser();
  thinkTime(0.5, 1.5);
  getUsers();
  thinkTime(1, 2);
}