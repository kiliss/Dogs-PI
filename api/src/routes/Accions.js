const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temper } = require('../db');

const getApiInfo = async () => {
    try {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.YOUR_API_KEY}`);
    const apiInfo = apiUrl.data.map(dog => {
        let temperamentArray = [];
        if (!dog.temperament) {
            temperamentArray = ["Not specified"];
        }
        if (dog.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
            temperamentArray = dog.temperament.split(", ");
        }
        
        let weightMin = dog.weight.metric.split(" - ")[0];
        let weightMax = dog.weight.metric.split(" - ")[1];
        let heightMin = dog.height.metric.split(" - ")[0];
        let heightMax = dog.height.metric.split(" - ")[1];
        let lifeSpanAll = dog.life_span.split(" - ");
        let lifeSpanMin = lifeSpanAll[0];
        let lifeSpanMax = lifeSpanAll[1];
        if(dog.name === "Smooth Fox Terrier"){
            weightMin = "6";
        }
        if(dog.name === "Olde English Bulldogge"){
            weightMin = "20";
            weightMax = "30";
        }
        return {
            id: String(dog.id),
            name: dog.name,
            image: dog.image.url,
            Tempers: temperamentArray,
            weightMin: weightMin,
            weightMax: weightMax,
            heightMin: heightMin,
            heightMax: heightMax,
            life_spanMin: lifeSpanMin,
            life_spanMax: lifeSpanMax,
        }
    });
    return apiInfo;
    } catch (error) {
        console.log(error);
    }
}

const getDBInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temper,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
            },
        }
    })
};

const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    // const infoTotal = [...apiInfo, ...dbInfo];
    
    return infoTotal;
}

const findTemperApi = async () => {
    try{
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.YOUR_API_KEY}`)
    
    const tempDB = apiUrl.data
    .map((t) => t.temperament) //creo muchos arreglos con las palabras
    .toString() // las convierto a string
    .split(",") // las separo por comas
    .map((t) => t.trim()) // las quito los espacios
    .filter((t) => t.length > 1) // las quito las palabras que tienen una longitud de 1

    let resultado = tempDB.reduce((a,e)=>{
        if(!a.find(d => d == e)){
            a.push(e)
        }
        return a;
    },[])
    // let tempFilt = [...new Set(tempDB)]
    return resultado;          // quita repetidos
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllCharacters, getDBInfo, getApiInfo, findTemperApi };