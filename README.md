# Performance Testing Framework
> **Eesha Noor** | SDET | k6 + JavaScript

## Tech Stack
- k6 (Grafana k6)
- JavaScript ES6
- GitHub Actions CI
- Grafana + InfluxDB (optional local dashboard)

## Test Types
| Type | Script | Purpose |
|------|--------|---------|
| Load | load-test.js | Validate performance under expected load |
| Stress | stress-test.js | Find breaking point |
| Spike | spike-test.js | Sudden traffic surge behaviour |
| Soak | soak-test.js | Sustained load over time |
| Smoke | smoke-test.js | Baseline sanity check |

## SLOs / Thresholds
- p95 response time < 500ms
- p99 response time < 1500ms
- Error rate < 1%
- Throughput > 100 RPS

## Run Tests
```bash
# Install k6: https://k6.io/docs/getting-started/installation/
k6 run tests/smoke-test.js
k6 run tests/load-test.js
k6 run tests/stress-test.js
k6 run --out influxdb=http://localhost:8086/k6 tests/load-test.js
```

## Project Structure
```
tests/
├── smoke-test.js       Quick sanity (1 VU, 1 min)
├── load-test.js        Normal load (50 VUs, ramp up/down)
├── stress-test.js      Find breaking point (ramp to 300 VUs)
├── spike-test.js       Sudden spike (0 -> 500 VUs instantly)
└── soak-test.js        Sustained 2h test
utils/
├── helpers.js          Shared utilities
└── thresholds.js       Reusable SLO thresholds
config/
└── environments.js     Env-specific base URLs
```