## Anotações sobre o Babel

Cria o arquivo package.json

```
$ npm init
``` 

Instala o Babel na versão especificada como uma dependência de desenvolvimento

```
$ npm install babel-cli@<versao> --save-dev
``` 

Instala o preset para que o Babel consiga trabalhar com o ES2015(ES6)

```
$ npm install babel-preset-es2015@6.9.0 --save-dev
```

Criar o arquivo .babelrc e definir os presets desejados

```
{
    "presets": ["es2015"]
}
```

Configurar script de build no package.json

```
 "build": "babel <origem> -d <destino>  --source-maps"
```

Executar o script de build

```
$ npm run build
```

Também é importante adicionar o script no package.json de watch, que monitora alterações nos arquivos JS e faz a transpilação

```
 "watch": "babel js/app-es6 -d js/app --source-maps --watch"
```

Executar o script de watch (deixar executando enquanto desenvolve)

```
$ npm run watch
```