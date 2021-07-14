# PROJETO FINAL
# BACKEND
Backend do projeto final da disciplina de desenvolvimento web.

## PRÉ REQUISITOS
 - Node
 - Mongodb
 - Docker (opcional)

## COMO EXECUTAR

Uma vez que o repositório esteja em sua máquina local, abra o terminal e execute o comando:
`cd imoveis-backend`
Dentro do repositório use os comandos:
```npm install
   npm start
```
Se tudo ocorreu como o esperado a mensagem 'Listening on port 8000':

Opcionalmente é possível rodar o backend utilizando o docker-compose. Para isso basta utilizar uma das opções abaixo no terminal:
`docker-compose up`
ou
`make up`

## OBSERVAÇÃO IMPORTANTE
Como eu coloquei usuário e senha pro container ele espera ambos caso seja executado sem o docker, bem como as variáveis de ambiente. Farei essa alteração mais breve possível, porém está sendo executado normalmente com o docker. 
