const {
    Sequelize,
    FolderMaster
} = require('../models');
const {customAlphabet} = require('nanoid');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz',8);

exports.all = async (req,res)=>{
    try {
        const data = await FolderMaster.findAll();
        return res.send({
            status:true,
            data:data
        })
    } catch (err) {
        return res.send({
            status:false,
            message:err.message
        })
    }
}

exports.create = async (req,res)=>{
    const body = req.body;
    try {
        body.folder_m_id = nanoid();
        await FolderMaster.create(body);
        return res.send({
            status:true,
            message:'Berhasil Tambah Data'
        })
    } catch (err) {
        return res.send({
            status:false,
            message:err.message
        })
    }
}

exports.update = async (req,res)=>{
    const body = req.body;
    try {
        await FolderMaster.update({
            folder_name:body.folder_name
        },{
            where:{
                folder_m_id:body.folder_m_id
            }
        });
        return res.send({
            status:true,
            message:'Berhasil Update Data'
        })
    } catch (err) {
        return res.send({
            status:false,
            message:err.message
        })
    }
}