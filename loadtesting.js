
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 5, // Number of virtual users
  duration: '10s', // Duration of the test
};
export default function () {
  const res=http.get('https://test.k6.io');
  check(res, {
     'is status 200': (r) => r.status === 200 });
}
