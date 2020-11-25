# WeatherApp - Teste para vaga de Programador Júnior
Esse é um projeto para concorrer à uma vaga de Programador FullStack Júnior.

<section>
    <img src="demo.gif" alt="sol animado" width="500"/>
</section>

## Dependências
* Node 14.3 e NPM (apenas se desejar rodar fora do container)
* Docker
* Docker Compose

## Configurando e rodando local
Se estiver usando alguma VPN é provável que ao subir a stack o docker fique sem ips viáveis, ele irá gritar algo como

`ERROR: could not find an available, non-overlapping IPv4 address pool among the defaults to assign to the network`

 Para resolver esse problema nós temos que, antes de conectar com a nossa VPN, criar uma `docker network`, 
 assim conseguimos reservar uma boa fatia de endereços ips privados para que o docker consiga usá-los internamente.

Para criar a network execute: `docker network create dev-network --subnet 172.24.24.0/24`;

volte a ligar a sua VPN.

### Rode os containers
```
docker-compose up -d
```

## Tecnologias
* Node
* MongoDB
* React
