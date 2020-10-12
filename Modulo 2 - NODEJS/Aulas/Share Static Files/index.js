// Instancias 
import express from 'express';
const app = express();
app.use(express.json());

// Compartilha a pasta para acesso mas precisa do nome da img
app.use(express.static('public'));

// Compartilha a pasta com um Alias
app.use('/images',express.static('public'));

// Rodar App
app.listen(3000, () => {
    console.log('API RODANDO !');
} )