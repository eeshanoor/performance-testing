// Reusable SLO threshold definitions
export const standardThresholds = {
  http_req_duration: ['p(95)<500', 'p(99)<1500'],
  http_req_failed:   ['rate<0.01'],
  http_reqs:         ['rate>10'],
};

export const strictThresholds = {
  http_req_duration: ['p(95)<200', 'p(99)<500'],
  http_req_failed:   ['rate<0.005'],
};

export const relaxedThresholds = {
  http_req_duration: ['p(95)<2000', 'p(99)<5000'],
  http_req_failed:   ['rate<0.05'],
};