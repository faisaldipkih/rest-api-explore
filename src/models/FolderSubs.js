const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
    class FolderSubs extends Model{}

    FolderSubs.init({
        folder_s_id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true
        },
        folder_m_id:{
            type:DataTypes.STRING,
            allowNull:true
        },
        folder_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        parent_id:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },{
        sequelize,
        tableName:'folder_subs',
        modelName:'FolderSubs',
        timestamps:true
    })
    return FolderSubs;
}