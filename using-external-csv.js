//Using external CSV file with k6 and papaparse to parse the data
import { SharedArray } from "k6/data";
import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import http from "k6/http";
import { check } from "k6";

const csvData = new SharedArray("csv data", function () {
  const userCredentials = open("./users.csv");
  return papaparse.parse(userCredentials, { header: true }).data;
});

export default function () {
    csvData.forEach((credential) => console.log(`Username: ${credential.username}, Password: ${credential.password}`));
        
    
}   