const stores = ['negociacoes'];
const version = 5;
const dbName = 'aluraframe';

let connection = null;
let closeConnection = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível criar instâncias de ConnectionFactory')
    }

    static getConnection() {
        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);
            openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);
            openRequest.onsuccess = e => {
                
                if (!connection) {
                    connection = e.target.result;
                    closeConnection = connection.close.bind(connection);
                    connection.close = () => {
                        throw new Error('Não é possível fechar a conexão diretamente');
                    }
                }
                
                resolve(connection);
            };
            openRequest.onerror = e => reject(e.target.error.name);
        });
    }

    static closeConnection() {
        if (connection) {
            closeConnection();
            connection = null;
        }
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, { autoIncrement: true });
        });
    }
}