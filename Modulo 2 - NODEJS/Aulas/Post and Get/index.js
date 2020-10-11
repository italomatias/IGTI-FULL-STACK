import express from 'express';


const app = express();

app.get('/', (req , res) => {

    res.send('Hello World !!!!!!!');
});

app.post('/', (req , resp) => {
    const a = 3;
    const b = 5;
    const resul = a + b ;
    resp.send('Resultado : ' + resul);
});

app.listen(3000 , () => {
    console.log('API Started !');
});