import http from 'k6/http';
import {sleep} from 'k6';
import { Counter,Trend } from 'k6/metrics';

export const options = {
    vus:5,
    duration:'5s',
    thresholds: {
    http_req_duration: ['p(90)<350'], // 95% of requests should be below 250ms
    http_req_failed: ['rate<0.01'],
    my_counter: ['count>10'], // Custom threshold for the counter metric
    news_page_response_time: ['p(95)<200'], // Custom threshold for the trend metric
}
};
let myCounter = new Counter('my_counter');
let newsPagereponseTrend = new Trend('news_page_response_time');

export default function () {
    let res=http.get('https://test.k6.io/');
      myCounter.add(1);
    sleep(1);

    res = http.get('https://test.k6.io/news.php');
    newsPagereponseTrend.add(res.timings.duration);
    sleep(1);  

}
