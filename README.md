# Ceilr
## Projeto desafio CRUD Arbo

### Aplicação de gerenciamento de imóveis construída utilizando Laravel, React e MySQL

## Pré-requisitos
- [Docker](https://www.docker.com/get-started/) e [Docker Compose](https://docs.docker.com/compose/install/)
- Node 18^ [(nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)
## Setup

Clonar o repositório.
```sh
git clone git@github.com:otavioq/ceilr.git && cd ceilr
```

Instalar os pacotes Node.
```sh
npm i
```

Configurar variáveis de ambiente e conexão com o DB.
```sh
cp .env.example .env
```

```
# .env

DB_CONNECTION=mysql
DB_HOST=172.17.0.1
DB_PORT=3306
DB_DATABASE=ceilr
DB_USERNAME=root
DB_PASSWORD=root
```

Executar o Docker Compose para inicializar o sistema.
```sh
docker compose up
```

Executar os comandos de configuração do Laravel, migrations e JWT dentro da VM do Docker.
```sh
docker compose exec ceilr bash -c "
    composer update && composer install
    php artisan key:generate
    php artisan jwt:secret
    php artisan migrate
    exit
"
```

Caso queira acessar a VM do Docker
```sh
docker compose exec ceilr bash
```

Inicializar o Vite para compilação do front-end
```sh
npm run dev
```

Agora basta acessar o [localhost](http://localhost).

As portas podem ser configuradas no arquivo `.env` através das variáveis `APP_FORWARD_PORT` e `DB_FORWARD_PORT`.

Para executar os testes de implementação.
```sh
docker compose exec ceilr bash -c "php artisan test"
```

# O Ceilr
## Ceilr, abreviado de _ceiler_, é _"aquele que faz o teto, constrói a cobertura da edificação"_.

O sistema consiste em um _back-end_ feito com _PHP_, utilizando o framework _Laravel_, dividido no modelo _MVC_ e utiliza uma camada extra de abstração com os _services_,
que encapsulam toda a lógica de manipulação dos registros, tirando a responsabilidade dos _controllers_, os tornando mais manuteníveis.

Com a utilização de _observers_, o controle da manipulação dos registros também se torna mais seguro durante o desenvolvimento e manutenção do código.

Utiliza-se, também, os _resources_, que melhoram a maneira com que os dados são retornados pelas _APIs_, podendo ser utilizados para complementar as informações de acordo com a necessidade.

A aplicação conta com testes de implementação, onde cada _API_ pode ser testada para a verificação da sua integridade. Quando os testes são executados, é utilizado um banco de dados reserva,
próprio para testes, não impactando nos registros do banco de dados principal.

O _front-end_, construído utilizando o _React_, também possui sua estrutura bem dividida, contando com diretórios individuais para cada página e componente,
fazendo uso da biblioteca _React Bootstrap_ para estilização e customização dos mesmos.<br>
Para armazenar o estado da aplicação, é utilizado o _Redux_, que ajuda na verificação da sessão do usuário e permite recuperar as informações deste a qualquer momento dentro do código no _front-end_.<br>
Todas as requisições são feitas utilizando o _Axios_, onde o site faz as chamadas para o _back-end_ através de _APIs_, passando um token de autenticação para a verificação do usuário logado.
