## Anotações sobre SystemJS

O SystemJS serve para fazer o carregamento dos módulos desenvolvidos pelo programador (similar ao autoloader no PHP).

Para utilizar o SystemJS precisamos instalá-lo

```
$ npm install systemjs@<versao> --save
```

Para utilizar o SystemJS com o Babel precisamos instalar um plugin

```
$ npm install babel-plugin-transform-es2015-modules-systemjs@<versao> --save-dev
```

Importar o script na index.html e fazer configurações iniciais:

```
    <script src="node_modules/systemjs/dist/system.js"></script>
    <script>
        System.defaultJSExtensions = true; //Omitir extensao .js ao importar arquivos
        System.import('<arquivo de boot>').catch(function(err) {
            console.log(err);
        });
    </script>
```

OBS: Para fazer as configurações inicias, temos que criar um arquivo chamado boot.js e apontar ele no script de configuração. Este será o primeiro arquivo a ser carregado pelo SystemJS.

Configurar o plugin no arquivo .babelrs para que o Babel o reconheça

```
 "plugins": ["transform-es2015-modules-systemjs"]
```

