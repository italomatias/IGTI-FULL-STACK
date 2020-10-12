// Importes e Inicialização
import express from 'express';
import {promises as fs} from  'fs';
const router = express();
const {readFile , writeFile } = fs;
import cors from 'cors';

// Post recebendo dados 
router.post('/' , async ( req , res , next ) => {   
    try {
        // Pega params do post
        let account = req.body;
        // Validçao dos parametros
        if(!account.name || account.balance == null ){ 
            throw new Error('Name e Balance são Obrigatórios');
        };
         // Ler arquivo de contas
        const doc = JSON.parse(await readFile(global.accounts));   
        // Salva ID da conta, demais objetos do parametro e aumenta o ID
        account = { id: doc.nextId , name: account.name , balance: account.balance };
        doc.nextId++;
        // Add a conta no Json em memória 
        doc.accounts.push(account);
        // Salva o Json com o dados alterados
        await writeFile(global.accounts, JSON.stringify(doc , null , 2)); //Salva Json Formatado
        // Retorna info 
        res.send(account);
        // Log de Operação Realizada com Sicesso
        global.log.info(`POST REALIZADO COM SUCESSO - ${JSON.stringify(account)} `);

    } catch (err) {
        next(err);
    }    
});

// Get Retornando todas as contas
router.get('/', cors() ,  async ( req , res ,next ) => { // CORS disponibiliza apenas este metodo para todas as portas
    try {
        // Busca Objeto JSON para exibir na requisição
        let doc = JSON.parse(await readFile(global.accounts)); 
        // Apaga Next ID para não exibir para o usuário ( Apaga na memória apenas) 
        delete doc.nextId;
        res.send(doc);
        // Log de Operação Realizada com Sicesso
        global.log.info(`GET REALIZADO COM SUCESSO `);
    } catch (err) {
        next(err);
    }
});

// Get por ID retornando registro com base no param parametro 
router.get('/:id' , async (req , res) => {
    try {
        // Busca Objeto JSON para exibir na requisição
        let doc = JSON.parse(await readFile(global.accounts)); 
        // Busca ID da conta com base no PARAM ! 
        let account = doc.accounts.find( account => account.id == req.params.id );
        // Retorna o valor achado 
        res.send(account);            
        // Log de Operação Realizada com Sicesso
        global.log.info(`GET ID REALIZADO COM SUCESSO`);
    } catch (err) {
        next(err);
    }    
});

// Deleta o registro do Json com base num PARAM ! 
router.delete('/:id' , async (req , res , next ) => {
        try {
            // Busca Objeto JSON para exibir na requisição
            let doc = JSON.parse(await readFile(global.accounts)); 
            // Filtra o DOC com todos os registros diverentes do ID do param mas tem que converter pora int
            let del = doc.accounts.filter( account => account.id !== parseInt(req.params.id));
            // Salva o Json com o dados alterados
            await writeFile(global.accounts, JSON.stringify(del , null , 2)); //Salva Json Formatado
            // Só finaliza mas nao retorna nada
            res.send(del);
            // Log de Operação Realizada com Sicesso
            global.log.info(`DELETE ID REALIZADO COM SUCESSO`);
        } catch (err) {
            next(err)  ;      
        }        
} );

// Metódo Put ( Atualiza registro todo com base no objeto do body)
router.put('/' , async ( req , res , next ) => {
    try {
        // Pega params do put
        let param = req.body;
        // Validçao dos parametros
        if(!param.name || param.balance == null ){ 
            throw new Error('Name e Balance são Obrigatórios');
        };
        // Busca Objeto JSON para exibir na requisição
        let doc = JSON.parse(await readFile(global.accounts)); 
        // Busca o index do objeto do param
        let index = doc.accounts.findIndex( account => account.id === param.id );
        // Validação se index existe
        if(index === -1){
            throw new Error('Índice informado não existe');
        };
        // Atualiza doc com param informado na posição certa
        doc.accounts[index].name = param.name;
        doc.accounts[index].balance = param.balance;
        // Salva o Json com o dados alterados
        await writeFile(global.accounts, JSON.stringify(doc , null , 2)); //Salva Json Formatado
        // Só finaliza mas nao retorna nada
        res.send( doc);
        // Log de Operação Realizada com Sicesso
        global.log.info(`PUT ID REALIZADO COM SUCESSO`);
    } catch (err) {
        next(err)  ;    
    }          
});

// Método Patch para atualizão parcial de registros  ( apenas uma propiedade )
router.patch('/updateBalance' , async( req , res , next ) => {
    try {
        // Pega params do put
        let param = req.body;
        if(!param.id || param.balance == null ){ 
            throw new Error('Id e Balance são Obrigatórios');
        };
        // Busca Objeto JSON para exibir na requisição
        let doc = JSON.parse(await readFile(global.accounts)); 
        // Busca o index do objeto do param
        let index = doc.accounts.findIndex( account => account.id === param.id );
        // Validação se index existe
        if(index === -1){
            throw new Error('Índice informado não existe');
        };
        // Atualiza doc com param informado na posição certa
        doc.accounts[index].balance = param.balance;
        // Salva o Json com o dados alterados
        await writeFile(global.accounts, JSON.stringify(doc , null , 2)); //Salva Json Formatado
        // Só finaliza mas nao retorna nada
        res.send(doc.accounts[index]);
        // Log de Operação Realizada com Sicesso
        global.log.info(`PATCH ID REALIZADO COM SUCESSO`);
    } catch (err) {
        next(err)  ;
    }   
});

// Tramamento de erros para todos os metodos 
router.use((err , req , res , next) => {
    global.log.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({error: err.message});        
});

// Exportação do pacote para outros métodos
export default router;
