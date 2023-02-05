//importar o express
import * as express from 'express';
import * as cors from 'cors';

//criar a aplicação express
const app = express();

//resolver o cors para o front - resolver json
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

//escutar a porta de backend
app.listen(5000)