"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importar o express
var express = require("express");
var cors = require("cors");
//criar a aplicação express
var app = express();
//resolver o cors para o front - resolver json
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
//escutar a porta de backend
app.listen(5000);
