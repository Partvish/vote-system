const api = 'https://voting.homework.snapsoft.hu/api/';
const apiKey = '42zsfvgtXeRlkFqtEmI2w1IK9RyO1LCg';

const FetchWithHeaders = (apiPoint: string, requestOptions: any, query: any = {}) => {
    if(!requestOptions.headers) {
        requestOptions.headers = {}
    }
    requestOptions.headers["X-Api-Key"] = apiKey;
    requestOptions.headers["Content-Type"] = 'application/json';
    let url = api + apiPoint;
    if(query) {
        let tmp = new URL(url);
        tmp.search = new URLSearchParams(query).toString();
        url = tmp.toString();
    }

    console.log(`${requestOptions.method} method call sent, url: ${url}`)
    return fetch(url, requestOptions);
    
}





export {
    FetchWithHeaders,
}