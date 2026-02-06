import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://api.restful-api.dev/objects/7');

  const body = JSON.parse(res.body);

  console.log(body)

  check(res, {
    'status is 200': (r) => r.status === 200,
    'name is Apple MacBook Pro 16': () => body.name === "Apple MacBook Pro 16",
    'Manufacturer year is 2019': () => body.data.year === 2019,
    'price should be less than 1900': () => body.data.price < 1900
  });
} 
