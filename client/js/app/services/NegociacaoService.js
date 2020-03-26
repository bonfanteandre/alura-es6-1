class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            return negociacoes
                .reduce((novasNegociacoes, negociacoes) => novasNegociacoes.concat(negociacoes), [])
        }).catch(erro => {
            throw new Error(erro)
        });

    }

    obterNegociacoesDaSemana() {
        
        return this._http.get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações da semana');
            });
    }

    obterNegociacoesDaSemanaAnterior() {

        return this._http.get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações da semana anterior');
            });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações da semana retrasada');
            });
    }

}