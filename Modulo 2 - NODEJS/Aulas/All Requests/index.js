import express from "express";
const  app = express();

// Informa Express que irá trabalhar com JSON.
app.use(express.json());

app.all('/all', (req , res) => {
    res.send(' A requisição que o boi solicitou foi: ' + req.method );
});

// O último caracteres pode ser informado ou não
app.get('/teste?', (req , res ) => {
    res.send('AUTO COMPLETE ??? !');
});

// Pode digitar o últomo caracteres inumeras vezes ue i link funfa
app.get('/buzz+', (req , res ) => {
    res.send('AUTO COMPLETE +++ !');
});

// pode substiruir o último caractere por qualquer letra ou palavra que funciona
app.get('/one*blue', (req , res ) => {
    res.send('AUTO COMPLETE *** !');
});

// Auto complete com palavras
app.get('/test(ing)?', (req , res ) => {
    console.log(req.body);
    res.send('AUTO COMPLETE ()? !');
});

// Expressão Regular 
app.get(/.*Red$/, (req , res ) => {
    res.send('Expressão Regular!');
});

// Recebe parametros na URL 
app.get('/testeparam/:id/:a?' , ( req , res ) => {
    res.send(req.params.id + '   ' + req.params.a);
});

// Prametros via Query
app.get('/testQuery' , (req , resp) =>{
    console.log(req.query );
    resp.send(req.query);
} );

// Chamada de mais uma função no request (NEXT)
app.get('/functions', ( req , res , next ) => {
    console.log('Callback 1');
    next();
} , (req , res ) => {
    console.log('Callback 2');
    // Requesição sem retorno
    res.end();
});


// Functions de Callback 
const a = (rep,res,next) => {
    console.log('Callback 1');
    next();
};

function b (rep , res ,next ) {
    console.log('Callback 2');
    next();
};

const c = (rep,res) => {
    console.log('Callback 3');
    res.end();
};

// Callback com array 
app.get('/array', [a,b,c]);

// Rotea as requisiç~es com base nas que foram informadas
app.route('/route')
    .get((req,res) => {
        res.send('Chamou get !');
    })
    .post((req,res) => {
        res.send('Chamou post !');        
    })
    .delete((req,res) => {
        res.send('Chamou Delete !');
    });

    
// Inicia o Server 
app.listen(3000, () => {
    console.log('API RODANDO OTÁRIO ! ');
});