const axios = require('axios');
const { YOUR_API_KEY } = process.env;
const { Dog, Temper } = require('../db');

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = await apiUrl.data.map(dog => {
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            temperament: dog.temperament,
            height: dog.height.metric,
            weight: dog.weight.metric,
            life_span: dog.life_span,
        }
    });
    return apiInfo;
}

const getDBInfo = async () => {
    return await Dog.findAll({
        includes:{
            model: Temper,
            attributes: ['name'],
            through: { attributes: [] }
        },
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
    return resultado;          // quita repetidos
}

module.exports = { getAllCharacters, getDBInfo, getApiInfo, findTemperApi };