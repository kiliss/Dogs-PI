const { Router, application } = require('express');
const { getAllCharacters, findTemperApi, getApiInfo} = require('./Accions');
const { Dog, Temper } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let dogsTotal = await getAllCharacters();
    if (name) {
        let characterName = dogsTotal.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        if(characterName.length > 0){
            res.status(200).send(characterName);
        } else {
            res.status(404).send({ message: 'No se encontró el perro' });
        }
    } else {
        res.status(200).send(dogsTotal);
    }
});

router.get("/dogs/:id", async (req, res) => {
    const id = req.params.id;
    let dogsTotal = await getAllCharacters();
    let dogFind = dogsTotal.filter(dog => dog.id === Number(id));
    if(dogFind.length > 0){
        res.status(200).send(dogFind);
    } else {
        res.status(404).send({ message: 'No se encontró el perro' });
    }
});

router.get("/temperaments", async (req, res) => {
    let temperament = await findTemperApi();
    temperament.forEach((t) => {
        // se fija si el temperamento esta, si esta no hace nada, si no lo crea
        Temper.findOrCreate({ // se fija si el temperamento esta, si esta no hace nada, si no lo crea
            where: { name: t }, // se fija si el temperamento esta en la bd
        });
    });
    const totalTemp = await Temper.findAll(); // findAll trae todos los temperamentos de la bd
    res.json(totalTemp);
});


router.post("/dogs", async (req, res) => {
    const { 
        name, 
        heightMin, 
        heightMax,
        weightMin, 
        weightMax,
        life_spanMin, 
        life_spanMax, 
        image, 
        createInDB,
        Tempers, 
     } = req.body;
    let dogsTotal = await getAllCharacters();
    let dogFind = dogsTotal.filter(dog => dog.name === name);
    if(dogFind.length > 0){
        res.status(400).send({ message: 'El perro ya existe' });
    } else {
        let newDog = await Dog.create({
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_spanMin,
            life_spanMax,
            image,
            createInDB,
        });

        let associatedTemp = await Temper.findAll({
            where: { name: Tempers},
        })
        newDog.addTemper(associatedTemp);
        res.send("Perro creado con exito");
    }
});




module.exports = router;
