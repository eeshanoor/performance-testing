import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

export const errorRate    = new Rate('errors');
export const loginTrend   = new Trend('login_duration');
export const getUserTrend = new Trend('get_user_duration');
export const txCounter    = new Counter('transactions');

export const BASE_URL = 'https://reqres.in/api';

export const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export function loginUser(email = 'eve.holt@reqres.in', password = 'cityslicka') {
  const start = Date.now();
  const res = http.post(`${BASE_URL}/login`, JSON.stringify({ email, password }), { headers });
  loginTrend.add(Date.now() - start);
  const success = check(res, {
    'login status is 200':   r => r.status === 200,
    'login has token':       r => r.json('token') !== undefined,
  });
  errorRate.add(!success);
  txCounter.add(1);
  return res.json('token');
}

export function getUsers(page = 1) {
  const start = Date.now();
  const res = http.get(`${BASE_URL}/users?page=${page}`, { headers });
  getUserTrend.add(Date.now() - start);
  const success = check(res, {
    'get users status 200': r => r.status === 200,
    'has data array':       r => Array.isArray(r.json('data')),
    'response time < 500ms': r => r.timings.duration < 500,
  });
  errorRate.add(!success);
  return res;
}

export function createUser(name, job) {
  const res = http.post(`${BASE_URL}/users`, JSON.stringify({ name, job }), { headers });
  const success = check(res, {
    'create user status 201': r => r.status === 201,
    'has user id':            r => r.json('id') !== undefined,
  });
  errorRate.add(!success);
  return res;
}

export function thinkTime(min = 1, max = 3) {
  sleep(Math.random() * (max - min) + min);
}