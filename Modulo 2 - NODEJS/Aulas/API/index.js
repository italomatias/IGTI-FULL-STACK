// Instancias e Imports
import express from 'express';
import accouts from './routes/account.js';
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import {swaggerDoc} from './doc.js';
// Chama metodo de trabalho com arquivos já com a promisse 
import {promises as fs} from  'fs';


// Inicial contante com express
const app = express();

// Libera todos os metódos da API para todas as portas do server
app.use(cors());

//Variavél para a documentação
app.use('/doc', swaggerUi.serve , swaggerUi.setup(swaggerDoc));

//destrutor para evitar chamar fs.writefile e fs.Readfile
const {readFile , writeFile } = fs;

//Variavéis para log
const {combine , timestamp , label , printf} = winston.format;

// Formato do log
const myfortmat = printf(({level,message,label,timestamp}) => {
    return `${timestamp}  ${label} ${level} ${message}`
});

// Var global para acesso em todo sistema
global.accounts = 'accounts.json'

global.log = winston.createLogger({
    level: 'silly',
    transports: [ 
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'my-bank-api.log'})
     ],
     format: combine(
            label({label: 'my-bank-api'}),
            timestamp(),
            myfortmat
     )
});

// Informa o Express para usar Json
app.use(express.json());

// Roteando requeisições serem enviadas para o accounts 
app.use('/account',accouts);


async function StartAPI(){

    // Verificar se arquivo existe 
    try {

        await readFile(global.accounts); 
        global.log.info('API INICIADA USANDO ARQUIVO EXISTENTE')

    } catch (error) {
    
        try {
             // Cria arquivo Json ao iniciar a apllicação    
                const initialJson = {
                nextId:1,
                accounts:[] 
            };            
            await writeFile(global.accounts,JSON.stringify(initialJson)); 
            global.log.info('API INICIADA CRIANDO ARQUIVO') 
        } catch (error) {
            global.log.error('ERRO AO CRIAR JSON DE CONTAS')
        }                       
    }

};

// Iniciando API
app.listen(3000 , StartAPI());