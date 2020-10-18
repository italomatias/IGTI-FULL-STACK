// Framework 
import express from 'express';
// File System para trabalhar com arquivos
import { promises as fs } from 'fs';
// importa js com as operações da API
import crud from './crud.js';
//Inicia var do express 
const app = express();
// Roteando requisições para ir para crud
app.use('/',crud);
// Descontrutor para escrever e ler arquivos
const { writeFile , readFile } = fs;
// Var global do arquivo grades
global.grades = 'grades.json';
// INICIANDO API 
app.listen( 3000 , async () => {
    console.log('API RODANDO O BOIZÃO ! ');
    // Lê documento de grades
    let  grades = JSON.parse(await readFile(global.grades));
    // Salva documento de grades em formato simples para entendimento
    await writeFile(global.grades, JSON.stringify(grades , null , 2));    
});