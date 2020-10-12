// Instancias e Imports
import express from 'express';
import accouts from './routes/account.js';
// Chama metodo de trabalho com arquivos já com a promisse 
import {promises as fs} from  'fs';

// Inicial contante com express
const app = express();

//destrutor para evitar chamar fs.writefile e fs.Readfile
const {readFile , writeFile } = fs;

// Var global para acesso em todo sistema
global.accounts = 'accounts.json'

// Informa o Express para usar Json
app.use(express.json());

// Roteando requeisições serem enviadas para o accounts 
app.use('/account',accouts);


async function StartAPI(){

    // Verificar se arquivo existe 
    try {

        await readFile(global.accounts); 
        console.log('API RODANDO USANDO ARQUIVO EXISTENTE !');

    } catch (error) {
    
        try {
             // Cria arquivo Json ao iniciar a apllicação    
                const initialJson = {
                nextId:1,
                accounts:[] 
            };            
            await writeFile(global.accounts,JSON.stringify(initialJson)); 
            console.log('API RODANDO E ARQUIVO CRIADO !');  
        } catch (error) {
            console.log('Erro ao crirar Json');
        }                       
    }

};

// Iniciando API
app.listen(3000 , StartAPI());