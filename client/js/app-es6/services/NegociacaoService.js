import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {

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

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(() => {
                throw new Error('Não foi possível adicionar a negociação')
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.lista())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível listar as negociações');
            });
    }

    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.truncar())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações')
            });
    }

    importa(listaNegociacoesAtual) {
        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !listaNegociacoesAtual.some(negociacaoExistente => negociacaoExistente.equals(negociacao)))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações');
            });
    }
}