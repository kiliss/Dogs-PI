const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temper', {
    name: {
      type: DataTypes.STRING,            //el id se genera automaticamente por Sequelize
    },
  },
  {
    timestamps: false,
  });
}
//  Temperamento con las siguientes propiedades:
// ID
// Nombre