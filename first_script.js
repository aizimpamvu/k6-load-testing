import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus:1000,
  duration:'5s'
};

export default function () {
  const res=http.get('https://staging.urubutopay.rw/');
  check(res, {
     'is status 200': (r) => r.status === 200 });
     sleep(1);
}