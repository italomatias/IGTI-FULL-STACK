//Instancias
import express from 'express';
import winston from 'winston';
const  app = express();
app.use = (express.json());

// Objetos para log
const { combine , printf , label , timestamp } = winston.format;

// Devinindo formato Json do log
const myformat = printf(({level,message,label,timestamp}) =>{
    return `${timestamp} [${label}] ${level} ${message}`
} );

//Criando Log
const log =winston.createLogger({
    // Tipo de Log ( Muito , médio os todas as info)
    level: "warn",
    // Local onde será salvo o lOG ( Console e Arquivo)
    transports: [
        new (winston.transports.Console)(),
        new(winston.transports.File)({filename:'Log.log'})
    ],
    // Formato do Log
    format: combine(
        label({label:'Nome'}),
        timestamp(),
        myformat
    )
});

// TIPO DE LOG com base do nível 
log.error('Log de erro');
log.warn('Log de Warning');
log.info('Log de Informação');
log.verbose('Log de Verbose');
log.debug('Log de Debug');
log.silly('LOG DE Sily');
// Log passando tipo de log como parametro
log.log('info','LOG COM PARAM');

// Rodar API
app.listen(3000, () => {
    console.log('API RODANDO');
});