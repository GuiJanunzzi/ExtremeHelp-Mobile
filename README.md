# ExtremeHelp - Aplicativo Mobile

Este repositório contém o código-fonte do aplicativo móvel **ExtremeHelp**, desenvolvido em React Native com Expo, como parte da Global Solution para a disciplina de Mobile Application Development.

---

## 👥 Integrantes do Grupo

| Nome Completo        | RM      |
| -------------------- | ------- |
| Caike Dametto  | 558614  |
| Guilherme Janunzzi | 558461 |
|                  |      |

---

## 📺 Vídeo de Demonstração

Assista ao vídeo demonstrativo da aplicação, apresentando todas as suas funcionalidades, desde o login até a execução completa do CRUD de Pedidos de Ajuda.

**➡️ [Link para o Vídeo no YouTube](https://youtu.be/lkp8UsyHloA)**

---

## 📖 Descrição da Solução (Global Solution)

**ExtremeHelp** é uma plataforma digital projetada para ser uma ponte solidária em momentos de crise. O objetivo principal é conectar, de forma rápida e geolocalizada, pessoas em situação de vulnerabilidade com voluntários dispostos a oferecer ajuda.

Além de coordenar os pedidos e atendimentos, a plataforma atua como um canal centralizado para a divulgação de alertas de emergência (como enchentes, ondas de calor ou outros riscos) e dicas de preparação, fortalecendo a resiliência e a segurança da comunidade.

Este aplicativo móvel serve como o principal ponto de interação para os usuários, permitindo que eles solicitem ajuda, acompanhem seus pedidos e se mantenham informados, tudo na palma da mão.

---

## 🚀 Tecnologias Utilizadas

* **Framework:** React Native (com Expo)
* **Linguagem:** JavaScript
* **Navegação:** React Navigation
* **Requisições API:** Axios
* **Gerenciamento de Estado:** React Context API
* **Armazenamento Local:** AsyncStorage
* **Decodificação de Token:** jwt-decode

---

## ⚙️ Pré-requisito Essencial: API Back-end

Este aplicativo móvel funciona como um *front-end* e consome uma API RESTful em Java para todas as suas operações. Antes de executar o app mobile, é **obrigatório** que o servidor back-end e seu banco de dados estejam configurados e em execução.

Todas as instruções detalhadas para clonar, configurar e rodar a API Java e o banco de dados Oracle em Docker estão no repositório do back-end.

➡️ **Consulte o README do Back-end para o passo a passo da API: [ExtremeHelp - Java Backend Repository](https://github.com/Dametto98/GlobalSoluction/tree/main/ExtremeHelp/JAVA%20ADVANCED/ExtemeHelp-JavaBackend)**

---

## ⚙️ Como Executar o Projeto Mobile

Siga os passos abaixo para configurar e executar o aplicativo em seu ambiente de desenvolvimento, após o back-end já estar no ar.

### 📋 Pré-requisitos Locais

* [Node.js (versão LTS)](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/) 
* O aplicativo **Expo Go** instalado no seu celular (Android ou iOS)

### 1. Clonar o Repositório

No seu terminal, clone este repositório para sua máquina local.

```bash
git clone https://github.com/GuiJanunzzi/ExtremeHelp-Mobile
cd <NOME_DA_PASTA_DO_PROJETO>
```

### 2. Instalar as Dependências

Instale todas as dependências do projeto com o seguinte comando:

```bash
npm install
```

### 3. Configurar a Conexão com a API

Esta é a etapa mais importante para que o aplicativo funcione. Você precisa informar ao app qual é o endereço de IP da sua API Java.

* Abra o arquivo: `src/api/api.js`
* Encontre a linha que contém a constante `API_URL`.
* Substitua `<SEU_IP_LOCAL>` pelo endereço de IP da sua máquina ou VM onde a API está rodando.

```javascript
// Exemplo de como deve ficar a linha no arquivo api.js
const API_URL = '[http://192.168.1.10:8080](http://192.168.1.10:8080)'; // <-- Use o IP do seu computador/VM aqui!
```

> **Lembrete:** Seu computador (onde a API Java está rodando) e seu celular (com o Expo Go) precisam estar conectados na **mesma rede Wi-Fi**.

### 4. Iniciar a Aplicação

Com tudo configurado, inicie o servidor de desenvolvimento do Expo.

```bash
npx expo start
```

Um QR Code será exibido no seu terminal. Abra o aplicativo **Expo Go** no seu celular e escaneie este QR Code para carregar o aplicativo.

### 5. Testando o CRUD

O aplicativo implementa o CRUD completo para a entidade "Pedido de Ajuda". Para testar:

1.  **Login:** Use as credenciais de um usuário existente.
2.  **Read:** A tela principal (`HomeScreen`) listará todos os pedidos de ajuda existentes.
3.  **Create:** Use o botão "Preciso de Ajuda" para navegar até a tela de criação e cadastrar um novo pedido.
4.  **Update:** Na tela de detalhes de um pedido, use o botão "Aceitar Pedido" ou "Concluir Pedido" para alterar o status.
5.  **Delete:** Na tela de detalhes, o botão "Excluir Pedido" remove o registro do banco de dados.