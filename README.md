<p align='center'>
<img src='https://ms-f7-sites-01-cdn.azureedge.net/docs/stories/1429227625033526993-compasso-uol-professional-services-azure-pt-brazil/resources/009137f8-d97d-449c-8b02-1bc1276929fa/1429228339784747101_1429228339784747101' max-width='300px'/>
</p>


### Tabela de Conteúdos
- [Introdução](#Introdução)
- [Tecnologias](#Tecnologias)
- [Setup](#Setup)
 - [Requerimentos](#Requerimentos)
 - [Primeiros Passos](#Primeiros Passos)
 - [Configurando](#Configurando)
 - [Migrations](#Migrations)
 - [Modo desenvolvimento](#Modo desenvolvimento)
 - [Build e Produção](#Build e Produção)
- [Rotas](#Rotas)

### Introdução

Este projeto faz parte do programa de estágio da **Compasso OUL**.

A ideia é criar uma API para carteira digital de criptomoedas utilizando dos conhecimentos adquiridos durante a sprint.

O projeto foi desenvolvido em **Typescript** e **Express**.

### Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Typeorm](https://typeorm.io/#/)
- [Mysql](https://www.mysql.com/)
- [Moment.JS](https://momentjs.com/)

### Setup

##### Requerimentos
O projeto foi desenvolvido em [NodeJS](https://nodejs.org/en/), é nessário ter instalado na máquina para iniciar o projeto. Certifique-se de ter em sua máquima antes de iniciar:
```bash
node -v
```

É nessário também ter instalado um banco de dados compatível com o Typeorm. O projeto foi desenvolvido utilizando o Mysql mas se você optar por trocar de SGBD, verifique a lista de SGBDs suportados pelo Typeorm na [documentação](https://typeorm.io/#/undefined/installation).

##### Primeiros Passos
Usando o CLI do [git](https://git-scm.com/), faça uma cópia do projeto para sua máquina:
```bash
git clone https://github.com/diogo-alexandre/desafio-sprint03.git && cd desafio-sprint03
```
Em seguida instale todas dependencias do projeto.
Observação: A biblioteca `mysql2` é utilizada para conexão com o Mysql. Se você optar por usar uma biblioteca diferente, é nessário instalar uma dependecia compatível.
```bash
npm install
```

##### Configurando #####
O projeto usa de `enviroment variables` para guardar informações sigilosas e de configuração. É nessário criar um arquivo `.env` na raiz.

Exemplo de arquivo `.env`:
```
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_USER = root
DB_PASS = senha
DB_DATABASE = desafio
PORT = 3000
```

##### Migrations

Com o banco de dados configurado, é hora de criar as tabelas da aplicação no banco de dados. O projeto já possui um `script` para facilitar:

```bash
npm run typeorm migration:run
```

##### Modo desenvolvimento
Com o projeto configurado, é possível subir o servidor em modo desenvolvimento.
É possível usar o `script` para iniciar:
```
npm run start:dev
```
###### Não recomendado utilizar este comando em produção

##### Build e Produção
Após tudo isso, é possível `construir` o projeto em javascript.
Por padrão o projeto vai compilado em Ecmascript 2016, mas é possível mudar o `target` de build no arquivo `tsconfig.json`, que ficar na raiz do projeto.`

Para fazer a build do projeto, use:
```bash
npm run build
```
Vai ser criada uma pasta `dist` na raiz do projeto. Lá se encontra todo o projeto compilado em Javascript.

Após isso, basta iniciar o servidor:
```bash
npm run start
```
----
### Rotas

`GET` ***/api/v1/wallet***
&nbsp;Lista todas ***wallets***

- Exemplo de ***query params***
```
?name=Fulano&cpf=000.000.000-00&birthdate=01/01/2000&amont=0.0&createdAt=2000-01-30T00:00:00.000Z&updatedAt=2000-01-30T00:00:00.000Z
```

- Exemplo de ***retorno***
```js
{
	"wallets": [
		{
			"address": "123e4567-e89b-12d3-a456-42661417401235",
			"name": "fulano da silva",
		 	"cpf": "732.221.438-20",
			"birthdate": "05/01/2000",
			"coins": [
				{
					"coin": "BRL",
					"fullname": "Real",
					"amont": 112.0
				},
      		],
     		"transactions": [
				{
					"value": 0.0123110,
					"datetime": "2022-01-04T23:24:51.690Z",
					"sendTo": "123e4567-e89b-12d3-a456-42661417401233",
					"receiveFrom": "123e4567-e89b-12d3-a456-42661417401233",
					"currentCotation": 0.0143
				}
     		],
			"createdAt": "2022-01-05T23:24:51.690Z",
			"updatedAt": "2022-01-07T23:24:51.690Z"
		}
	]
}
```
___
`GET` ***/api/v1/wallet/{address}***
&nbsp;Retorna uma ***wallet***

- Exemplo de retorno
```json
{
	"address": "123e4567-e89b-12d3-a456-42661417401235",
	"name": "fulano da silva",
	"cpf": "732.221.438-20",
	"birthdate": "05/01/2000",
	"coins": [
		{
			"coin": "BRL",
			"fullname": "Real",
			"amont": 112.0,
			"transactions": [
				{
					"value": 0.0123110,
					"datetime": "2022-01-04T23:24:51.690Z",
					"sendTo": "123e4567-e89b-12d3-a456-42661417401233",
					"receiveFrom": "123e4567-e89b-12d3-a456-42661417401233",
					"currentCotation": 0.0143
				}
			]
		},
	],
	"createdAt": "2022-01-05T23:24:51.690Z",
	"updatedAt": "2022-01-07T23:24:51.690Z"
}
```
____

`POST` ***/api/v1/wallet***
&nbsp;Cria uma ***wallet***

- Exemplo de ***body***
```json
{
	"name": "fulano da silva",
	"cpf": "732.221.438-20",
	"birthdate": "05/01/2000"
}
```
- Exemplo de ***retorno***
```json
{
	"address": "123e4567-e89b-12d3-a456-42661417401235",
	"name": "fulano da silva",
	"cpf": "732.221.438-20",
	"birthdate": "05/01/2000",
	"createdAt": "2022-01-05T23:24:51.690Z",
	"updatedAt": "2022-01-07T23:24:51.690Z"
}
```
___

`PUT` ***/api/v1/wallet/{address}***
&nbsp;Adiciona/Remove fundo da ***wallet***

- Exemplo de ***body***
```json
[
	{
		"quoteTo": "USD",
		"currentCoin": "BTC",
		"value": -0.1221
	},
	{
		"quoteTo": "BRL",
		"currentCoin": "USD",
		"value": 0.00012
	}
]
````
___

`GET` ***/api/v1/wallet/{address}/transaction***
&nbsp;Retorna hisórico de movimentação de uma ***wallet***

- Exemplo de ***query params***
```
?coin=BTC&initialDate=30/01/2000&finalDate=30/01/2000
```

- Exemplo de ***retorno***
```json
[
	{
		"coin": "BTC",
		"transactions": [
			{
			"value": 0.0123110,
			"datetime": "2022-01-04T23:24:51.690Z",
			"sendTo": "123e4567-e89b-12d3-a456-42661417401233",
			"receiveFrom": "123e4567-e89b-12d3-a456-42661417401233",
			"currentCotation": 0.0143
			}
		]
	}
]
```
___

`POST` ***/api/v1/wallet/{adress}/transaction***
&nbsp;Transfere fundos de uma ***coin*** para outra ***wallet***

- Exemplo de ***body***
```json
{
	"receiverAddress":"123e4567-e89b-12d3-a456-42661417401233",
	"quoteTo": "USD",
	"currentCoin": "BTC",
	"value": 0.12210
}
```
___

`DELETE` ***/api/v1/wallet/{address}***
&nbsp;Deleta uma ***wallet***

```
204 em caso de ***sucesso***
```
___
