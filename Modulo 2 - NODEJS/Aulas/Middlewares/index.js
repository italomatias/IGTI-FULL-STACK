// Instâncias
import express from 'express';
import carrorouter from './carros.js';

const app = express();
app.use(express.json());

// Requisições de Carros vão para JS de carros
app.use('/carros', carrorouter);

// Qualquer requisição irá passar por aqui ex: Logs
app.use((req,res,next) => {
    console.log(new Date());
    next();
});

// Requsição a nível de aplicação 
app.get('/teste', (req,res) => {
    res.end();
})

// Roda Aplicação
app.listen(3000,() => {
    console.log('API RODANDO');
})