//Importando framwork
import express from 'express';
// File System para trabalhar com arquivos
import { promises as fs } from 'fs';
//Inicia var do express 
const appcrud = express();
// Desconstrutor para FS
const { writeFile , readFile} = fs;
// Define que API irá trabalhar com JSON
appcrud.use(express.json());

// METODO POST ( INSERIR )
appcrud.post('/' , async (req , res) =>{
    // lê objeto da requisição 
    let param = req.body;
    // Lê Json
    let doc = JSON.parse(await readFile(global.grades));
    // Cria objeto com os dados da requisição + ID e Data Criação 
    param = { id: doc.nextId , ...param , timestamp: new Date() };
    // Incrementa NextID
    doc.nextId++;
    // Adiciona param no Json
    doc.grades.push(param);
    // Salva dados no arquivo JSON mantendo formatação legível 
    await writeFile(global.grades , JSON.stringify(doc , null , 2) )
    // Retorna objeto criado
    res.send(param);
});

//METODO PUT ( UPDATE )
appcrud.put('/' , async ( req , res ) =>{
    // lê objeto da requisição 
    let param = req.body;
     // Lê Json
     let doc = JSON.parse(await readFile(global.grades));
     // Procura Index com base no parâmetro
     let index = doc.grades.findIndex( data => data.id === param.id );
     // Valida se index existe
     if(index === -1){
       res.send('Índice informado não existe');
    };
    // Substitu valores no local
    doc.grades[index].student =  param.student;
    doc.grades[index].subject =  param.subject;
    doc.grades[index].type    =  param.type;
    doc.grades[index].value   =  param.value;
    // Salva no arquivo 
    await writeFile(global.grades , JSON.stringify(doc , null , 2) )
    // Retorna objeto criado
    res.send('Atualização Realizada com sucesso');
});

// Metodo Delete 
appcrud.delete('/:id' , async ( req , res ) => {
    // Lê Json
    let doc = JSON.parse(await readFile(global.grades));  
    // Filtra removendo ID Informado 
    let del = doc.grades.filter( account => account.id !== parseInt(req.params.id));
    // Salva no arquivo objeto filtrado
    await writeFile(global.grades , JSON.stringify(del , null , 2) )
    // Retorna msg
    res.send('Delete Realizado com sucesso');
});

// Exportando para acesso em outros pontos da API
export default appcrud;