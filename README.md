<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

crie um arquivo .env

caso queira rodar elastic-apm-node / apm vc deve passar as env do elastic-apm

```bash
docker compose -f 'docker-compose-dev.yaml' up -d --build
```

## Estratégia de Geração e Uso de Hashes

- Geramos com antecedência um número X de hashes, assim controlamos a disponibilidade das hashes, evitando um loop grande para saber se a hash já foi usada ou não, já que temos um limite de 6^64, pois as hashes serão geradas de 64 caracteres.
- Na tabela de hash, iremos pegar a primeira hash disponível, retornar o valor e salvar na tabela de hash do usuário.

## Trafego Estimado

- 500 RPM
- 10 novas urls por minutos

## Armazenamento estimado no PostgreSQl

- **Tabelas:**
  - `HASHUSER`
    - hash: varchar(6) => PK => index
    - user_id: uuid = varchar(36)
    - url_original: varchar(255)
    - available: boolean
    - created_at: TIMESTAMPTZ
    - updated_at: TIMESTAMPTZ
    - count_access Int
  - `HASHES`
    - hash: varchar(6) => PK => index
    - available: boolean
    - created_at: TIMESTAMPTZ
- **Custo estimado por caractere no banco de dados PostgreSQL.**
  - `varchar()` => 4 byte por caractere
  - `TIMESTAMPTZ DEFAULT NOW()` => 8 byte por registro
  - `Boolean` => 1 byte por registro
  - `(INT ou integer)` => um inteiro ocupa 4 bytes
- **Custo estimado de armazenamento por registro:**
  - `HASHES`
    - custo estimado por registro na tabela `Hash` = 33 byte
    - 6.000.000 registros x 33 byte = 198000000 byte = 188.78MB
  - `HASHUSER`
    - custo estimado por registro na tabela `HASHUSER` = 688 byte = 0.000656 MB
    - 10 url por minuto x 60 minutos x 24 horas x 365 dias = 5.256.000 url
    - o total de armazenamento necessário estimado em um ano seria = 5.256.000 url x 0.000656 MB = 3.37 GB

## Melhorias

- [ ] Implementar rate limit com Redis.
- [ ] Implementar testes unitários, um exemplo de implementação = https://github.com/Thales-Eduardo/ddd

- **Para escalar horizontalmente.**
  - Kubernetes com EKS, um exemplo de implementação = https://github.com/Thales-Eduardo/terraform-eks
  - Separação de contextos.
  - Implementar arquitetura de microserviços.
  - Usar o Keycloak elimina a necessidade de criar um microserviço para autenticação, dessa forma economizando em licenças caso queira usar um API Gateway como Kong, onde a maioria dos plugins as licenças são pagas. Um exemplo de implementação = https://github.com/Thales-Eduardo/keycloak = um exemplo de implementação de kubernetes com o kong = https://github.com/Thales-Eduardo/kubernetes-kong
  - Usar bancos em cloud como Aurora para escalar tanto verticalmente como horizontalmente, dessa forma economiza no gerenciamento de infraestrutura.
  - Implementar uma série de regras de arquitetura para confiabilidade do software, como Circuit Breaking, Health Check, etc.
  - Um exemplo de Circuit Breaking com Istio.

```yml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
name: circuit-breaker-servicex
spec:
host: servicex-service.default.svc.cluster.local
trafficPolicy:
outlierDetection:
#consecutive5xxErrors: 10
consecutiveGatewayErrors: 6
interval: 20s
baseEjectionTime: 30s
maxEjectionPercent: 100
```
