
/**
 * Default function for K6 performance testing script.
 * This function performs HTTP requests to the K6 test API to retrieve crocodiles data,
 * extracts the first crocodile's ID and name, makes another request for details,
 * logs specific response headers, and performs checks on the response status and name.
 */
import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();
    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile name': (r) => r.json().name === crocodileName
    });

}