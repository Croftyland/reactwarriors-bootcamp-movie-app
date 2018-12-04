import queryString from "query-string";
export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "6ddc6aac66ba73b139a6a3f8c609c146";

export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGRjNmFhYzY2YmE3M2IxMzlhNmEzZjhjNjA5YzE0NiIsInN1YiI6IjViZjdiMGY2OTI1MTQxNWNjODBkZTFjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMjyxGg3paAcVDmBqZ-ewXnJGOtvHH36O0hiNKq1hq4";

export const fetchApi = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(res => {
                if (res.status < 400) {
                    return res.json();
                } else {
                    throw res;
                }
            })
            .then(data => resolve(data))
            .catch(res => {
                res.json().then(error => {
                    reject(error);
                });
            });
    });
};

export default class CallApi {
    static get(url, options = {}) {
        const { params = {} } = options;

        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return fetchApi(
            `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
            {
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                }
            }
        );
    }

    static post(url, options = {}) {
        const { params = {}, body = {} } = options;

        const queryStringParams = {
            api_key: API_KEY_3,
            ...params
        };

        return fetchApi(
            `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
            {
                method: "post",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );
    }

    static delete(url, options = {}) {
        const { body = {} } = options;

        const queryStringParams = {
            api_key: API_KEY_3
        };

        return fetchApi(
            `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
            {
                method: "delete",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );
    }
}
