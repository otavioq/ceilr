# Ceilr
## Projeto desafio CRUD Arbo

### Aplicação de gerenciamento de imóveis construída utilizando Laravel + React

## Pré-requisitos
- [PHP 8^](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Docker](https://www.docker.com/get-started/) e [Docker Compose](https://docs.docker.com/compose/install/)
- Node 18^ [(nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)
## Setup

Clonar o repositório.
```sh
$ git clone git@github.com:otavioq/ceilr.git && cd ceilr
```

Instalar dependências do Laravel.
```sh
$ composer update && composer install
```

Instalar os pacotes Node.
```sh
$ npm i
```

Configurar variáveis de ambiente e conexão com o DB.
```sh
$ cp .env.example .env
```

```
# .env

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ceilr
DB_USERNAME=root
DB_PASSWORD=root
```

Executar o Laravel Sail para inicializar o sistema. Este passo pode demorar alguns minutos na primeira vez.
```sh
$ ./vendor/bin/sail up
```
ou
```sh
$ ./vendor/bin/sail start
```

Executar os comandos de configuração do Laravel, migrations e JWT.
```sh
$ php artisan key:generate
$ php artisan jwt:secret
$ php artisan migrate
```

Inicializar o Vite para compilação do front-end
```sh
$ npm run dev
```

Agora basta acessar o [localhost](http://localhost)

# O Ceilr
## Ceilr, abreviado de _ceiler_, é _"aquele que faz o teto, constrói a cobertura da edificação"_.

O sistema consiste em um Back-end feito com PHP, utilizando o framework Laravel, dividido no modelo MVC
e utiliza uma camada extra de abstração com os _srvices_, que encapsulam toda a lógica de manipulação dos registros,
tirando a responsabilidade dos _controllers_, os tornando mais manuteníveis.

Com a utilização de _observers_, o controle da manipulação dos registros também se torna mais segura durante o desonvolvimento e manutenção do código.
Utiliza-se, também, os _resources_, que implementam 
