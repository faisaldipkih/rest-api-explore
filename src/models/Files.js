const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
    class Files extends Model{}

    Files.init({
        file_id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        file_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        folder_m_id:{
            type:DataTypes.STRING,
            allowNull:true
        },
        folder_s_id:{
            type:DataTypes.STRING,
            allowNull:true
        },
        file_path:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },{
        sequelize,
        tableName:'files',
        modelName:'Files',
        timestamps:true
    })
    return Files;
}