# Project Talker Manager

- Project to develop a `CRUD` to register speakers, developing endpoints to read and write files using `fs` module.

## Requirements

1. Create GET `/talker` endpoint ✔️
2. Create GET `/talker/:id` endpoint ✔️
3. Create POST `/login` endpoint ✔️
4. Create POST `/login` endpoint validations ✔️
5. Create POST `/talker` endpoint ✔️
6. Create POST `/talker/:id` endpoint ✔️
7. Create DELETE `/talker/:id` endpoint ✔️
8. Create GET `/talker/search` endpoint (/talker/search?q=searchTerm) ✔️
 
## Language and Tools

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="30" height="30"/> </a>
JavaScript
</br>
</br>
<a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="30" height="30"/> </a>
Node.js

## Get started

<details>
  <summary><strong> With Docker </strong></summary>
  </br>
  👉 Dockerfile and Docker-compose were provided by Trybe
  
  ⚠️ Before you start, you must check if your docker-compose version is 1.29 or higher
  </br>
  
  - Run `node` and `db` by running: 
  ```sh
  $ docker-compose up -d
  ```
  
  - Open interactive terminal using:
  ```sh
  $ docker exec -it talker_manager bash
  ```
  
  - Install dependencies, inside the container, with: 
  ```sh
  $ npm install
  ```
</details>

<details>
  <summary><strong> Install it locally </strong></summary>
  </br>
  
  - Open terminal and create a directory in your preferred location:
  ```sh
  $ mkdir <Your directory name here>
  ```
  
  - Access directory then clone the repository:
  ```sh
  $ cd <Your directory name here>
  $ git clone git@github.com:ViniGB/Project-Talker-manager.git
  ```
  
  - Access the newly created directory:
  ```sh
  $ cd Project-Talker-manager
  ```
  
  - Install dependencies:
  ```sh
  $ npm install
  ```
</details>
