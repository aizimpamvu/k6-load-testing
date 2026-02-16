import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', () => [
    { name: 'User1', job: 'QA' },
    { name: 'User2', job: 'Dev' },
    { name: 'User3', job: 'Tester' },
]);

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '10s', target: 5 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
    http_req_duration: ['p(90)<700'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
  },
};

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];

    const res = http.post(
        'https://reqres.in/api/users',
        JSON.stringify(user),
        { headers: { 'Content-Type': 'application/json' } }
    );

    check(res, {
        'created': (r) => r.status === 201,
    });

    sleep(1);
}
