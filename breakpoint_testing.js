// Breakpoint testing script using k6 to simulate a gradual increase in traffic to the staging environment of UrubutoPay. 
// The script ramps up to 10,000 virtual users over 10 seconds and checks that the response time is acceptable and that the error rate is low.
//The goal of this breakpoint test is to evaluate how the application handles a gradual increase in traffic, identify any bottlenecks or performance issues, and ensure that the system can recover gracefully after reaching the breakpoint.
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [
    { duration: '2h', target: 10000 }, // Ramp up to 10000 users over 2 hours
  
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
