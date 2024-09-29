const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
    class FolderMaster extends Model{}

    FolderMaster.init({
        folder_m_id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        folder_name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        sequelize,
        tableName:'folder_master',
        modelName:'FolderMaster',
        timestamps:true
    })
    return FolderMaster;
}