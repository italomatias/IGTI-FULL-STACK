//Instancias 
import express from 'express';
const app = express();
app.use(express.json());

// Tratamento padrão
app.get('/' , (req,res) => {
    throw new Error('EROOOOOOOOO OTÁRIO');
})

// Tratando erros assíncronos 
app.post('/', async(req , res , next) => {
    try {
        throw new Error('EROOOOOOOOO ASYNC');
    } catch (err) {
      next(err) ;
    }
   
});

// Mensagem de Erro para todas as aplicaçãoes 
app.use((err , req , res , next ) => {

    console.log('ERRO 1');
    // Manda para próxima função que trata erro !
    next(err);

});

app.use((err , req , res , next ) => {

    console.log('ERRO 2');
    res.status(500).send('DEU RUIM ! ');

});

// Rodar a API
app.listen(3000 , () => {
    console.log('API RODANDO');
});