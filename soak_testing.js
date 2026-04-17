// Soak testing is about testing system endurance and stability under a significant load for an extended period of time.
// primary goal of soak testing is to identify issues that may arise over time, such as memory leaks, resource exhaustion, or performance degradation, which may not be evident during shorter load tests.
//
import { check } from 'k6';
import http from 'k6/http';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '5m', target: 1000 }, // Ramp up to 1000 users over 5 seconds
    { duration: '24h', target: 10000 }, // Ramp up to 10000 users over 24hours
    { duration: '5m', target: 0}, // Ramp down to 0 users over 5 minutes
  
  ],
  thresholds: {
    http_req_duration: ['p(90)<700'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
  },
};


export default function () {
  const res=http.get('https://staging.urubutopay.rw/');
  check(res, {
     'is status 200': (r) => r.status === 200 });
}
