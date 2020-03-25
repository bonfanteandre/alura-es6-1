class NegociacaoService {

    obterNegociacoesDaSemana(cb) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let negociacoes = JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

                cb(null, negociacoes);

            } else {
                console.log(xhr.responseText);
                cb('Não foi possível importar as negociações', null);
            }
        };

        xhr.send();
    }

}