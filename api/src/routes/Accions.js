const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temper } = require('../db');

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = apiUrl.data.map(dog => {
        let weightMin = dog.weight.metric.split(" - ")[0];
        let weightMax = dog.weight.metric.split(" - ")[1];
        let heightMin = dog.height.metric.split(" - ")[0];
        let heightMax = dog.height.metric.split(" - ")[1];
        if(dog.name === "Smooth Fox Terrier"){
            weightMin = "6";
        }
        if(dog.name === "Olde English Bulldogge"){
            weightMin = "20";
            weightMax = "30";
        }
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            temperament: dog.temperament,
            weightMin: weightMin,
            weightMax: weightMax,
            heightMin: heightMin,
            heightMax: heightMax,
            life_span: dog.life_span,
        }
    });
    return apiInfo;
}

// const getDBInfo = async () => {
//     return await Dog.findAll({
//         includes:{
//             model: Temper,
//             attributes: ['name'],
//             through: { attributes: [] }
//         },
//     });
// }
const getDBInfo = async () => {
    return await Dog.findAll({
        include: [{
            model: Temper,
            attributes: ['name'],
            through: { attributes: [] }
        }],
    });
}


const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

const findTemperApi = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    
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
}

module.exports = { getAllCharacters, getDBInfo, getApiInfo, findTemperApi };