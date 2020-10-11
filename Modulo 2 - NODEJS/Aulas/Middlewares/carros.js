import express from 'express';

const router = express.Router();


router.get('/', (req,res) => {
    console.log('Get Carros !');
    res.send('Get Carros !');
});

export default router;