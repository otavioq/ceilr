# Ceilr
## Projeto desafio CRUD Arbo

### Aplicação de gerenciamento de imóveis construída utilizando Laravel + React

## Pré-requisitos
- [Docker](https://www.docker.com/get-started/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Composer](https://getcomposer.org/)
- Node [(nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)
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

Executar o Laravel Sail para inicializar o sistema. Este passo pode demorar alguns minutos da primeira vez.
```sh
$ ./vendor/bin/sail up
```
ou
```sh
$ ./vendor/bin/sail start
```

Acessar a VM do Docker e executar os comandos de configuração do Laravel, migrations e JWT.
```sh
$ ./vendor/bin/sail bash
```
```sh
sail$ php artisan key:generate
sail$ php artisan jwt:secret
sail$ php artisan migrate
```

Inicializar o Vite para compilação do front-end
```sh
$ npm run dev
```

Agora basta acessar o [localhost](http://localhost)