import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, group } from 'k6';
import {exec} from 'k6/execution';

export let options = {
    vus: 10,
    duration: '10s',
    tags: {
        test_type: 'performance',
    },
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        'http_req_duration{status:200}': ['p(95)<300'], // Custom threshold for the students_api tag
        http_errors: ['count==0'], // No errors should occur
        'group_duration{group:::Student API}': ['p(95)<200', 'p(99)<500'], // 95% of group durations should be below 200ms
    }
};
let httpErrors = new Counter('http_errors');

export default function () {
    group('Student API', function () {

        let response = http.get('https://69e74a6668208c1debe89e93.mockapi.io/api/register/students', {
        tags: {
            name: 'students_api',
        },
    });
 check(response, {
        'status is 200': (r) => r.status === 200,
    });
    if(response.error){
        exec.test.abort(`Request failed with error: ${response.error}`);
    }
    });
    
    group('courses_api', function () {
        let response = http.get('https://69e74a6668208c1debe89e93.mockapi.io/api/register/courses', {
        tags: {
            name: 'courses_api',
        },
    });
 check(response, {
        'status is 200': (r) => r.status === 200,
    });
});
}