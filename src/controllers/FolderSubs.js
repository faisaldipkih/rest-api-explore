const {
    Sequelize,
    sequelize,
    FolderSubs,
    Files
} = require('../models');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);

exports.show_master = async (req, res) => {
    const param = req.params
    try {
        let data = await sequelize.query(`select folder_s_id as id, folder_name as name, 'Folder' as tipe, "updatedAt" from folder_subs where folder_m_id='${param.folder_m_id}'
union
select file_id as id, file_name as name, 'File' as tipe, "updatedAt" from files where folder_m_id='${param.folder_m_id}'`, { type: Sequelize.QueryTypes.SELECT })
        return res.send({
            status: true,
            data: data
        })
    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        })
    }
}

exports.show_parent = async (req, res) => {
    const param = req.params
    try {
        // const data = await FolderSubs.findAll({
        //     where: {
        //         parent_id: param.parent_id
        //     }
        // })
        let data = await sequelize.query(`select folder_s_id as id, folder_name as name, 'Folder' as tipe, "updatedAt" from folder_subs where parent_id='${param.parent_id}'
            union
            select file_id as id, file_name as name, 'File' as tipe, "updatedAt" from files where folder_s_id='${param.parent_id}'`, { type: Sequelize.QueryTypes.SELECT })
        return res.send({
            status: true,
            data: data
        })
    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        })
    }
}

exports.create = async (req, res) => {
    try {
        const body = req.body;
        body.folder_s_id = nanoid();
        await FolderSubs.create(body);
        return res.send({
            status: true,
            message: 'Berhasil Tambah Data'
        })
    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        })
    }
}

exports.show_back = async (req, res) => {
    const param = req.params
    try {
        console.log(param);
        const check = await FolderSubs.findOne({
            where: {
                folder_s_id: param.folder_s_id
            }
        })
        console.log(check['parent_id']);
        let data = [];
        if (check) {
            if (check['folder_m_id'] != null) {
                data = await sequelize.query(`select folder_s_id as id,parent_id, folder_name as name, 'Folder' as tipe, "updatedAt" from folder_subs where folder_m_id='${check['folder_m_id']}'
                    union
                    select file_id as id,null as parent_id, file_name as name, 'File' as tipe, "updatedAt" from files where folder_m_id='${check['folder_m_id']}'`, { type: Sequelize.QueryTypes.SELECT })
            } else {
                data = await sequelize.query(`select folder_s_id as id,parent_id, folder_name as name, 'Folder' as tipe, "updatedAt" from folder_subs where parent_id='${check['parent_id']}'
                    union
                    select file_id as id,null as parent_id, file_name as name, 'File' as tipe, "updatedAt" from files where folder_s_id='${check['parent_id']}'`, { type: Sequelize.QueryTypes.SELECT })
            }
        }
        return res.send({
            status: true,
            data: data
        })
    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        })
    }
}