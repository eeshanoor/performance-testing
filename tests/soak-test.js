/**
 * Soak Test — Sustained load to detect memory leaks and degradation
 * 30 VUs for 2 hours
 */
import { loginUser, getUsers, createUser, thinkTime } from '../utils/helpers.js';
import { standardThresholds } from '../utils/thresholds.js';

export const options = {
  stages: [
    { duration: '5m',  target: 30 },   // ramp up
    { duration: '110m', target: 30 },  // hold for ~2 hours
    { duration: '5m',  target: 0  },   // ramp down
  ],
  thresholds: standardThresholds,
  tags: { type: 'soak' },
};

export default function () {
  loginUser();
  thinkTime(2, 4);
  getUsers(Math.ceil(Math.random() * 2));
  thinkTime(2, 4);
  createUser(`SoakUser_${__VU}_${__ITER}`, 'Tester');
  thinkTime(3, 6);
}