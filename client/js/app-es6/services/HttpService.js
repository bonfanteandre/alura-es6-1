export class HttpService {

    _handleErrors(response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    }

    get(url) {
        return fetch(url)
            .then(response => this._handleErrors(response))
            .then(response => response.json());
    }

    post(url, dados) {

        return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dados)
        })
        .then(response => this._handleErrors(response));
    }

}