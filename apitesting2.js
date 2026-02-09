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
        { duration: '10s', target: 10 },
        { duration: '5s', target: 10 },
        { duration: '5s', target: 0 },
    ],
};

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];

    const res = http.post(
        __ENV.URL,
        JSON.stringify(user),
        { headers: { 'Content-Type': 'application/json' } }
    );

    check(res, {
        'created': (r) => r.status === 201,
    });

    sleep(1);
}
