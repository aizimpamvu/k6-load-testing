// Stress testing script for UrubutoPay using k6 for above unusual load conditions
// This script simulates a high number of virtual users accessing the application simultaneously to evaluate its performance under stress conditions.
//Gradually ramping up to 1000 users to identify the breaking point of the application and observe how it handles extreme load.
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '10s', target: 1000 }, // Ramp up to 10 users over 10 seconds
    { duration: '20s', target: 1000 },  // Stay at 10 users for 20 seconds
    { duration: '10s', target: 0 },   // Ramp down to 0 users over 10 seconds
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
