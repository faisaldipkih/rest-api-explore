const express = require('express');
const app = express();
const cors = require('cors')
const db = require('./src/models')
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json({
    limit:"100mb"
}))

db.sequelize.sync();
app.use(cors());
app.get('/',(req,res)=>{
    res.send({
        'status':true,
        message:'Api explorer'
    })
})

const FolderMaster = require('./src/routes/FolderMaster');
app.use('/api/folder-master',FolderMaster);

const FolderSubs = require('./src/routes/FolderSubs');
app.use('/api/folder-subs',FolderSubs);

const Files = require('./src/routes/Files');
app.use('/api/files',Files);

app.listen(process.env.PORT,()=>console.log(`App listening on port http://localhost:${process.env.PORT}`))