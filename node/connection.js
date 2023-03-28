const express = require('express');
const cors = require('cors');

const mysql = require('mysql');
const db = mysql.createConnection({
    host:'94.237.73.65',
    user:'interview',
    password:'machinetest123',
    database:'machine_test'
});

const app = express();

 app.use(express.json());

app.listen(3000,()=>{
    console.log('listening on port 3000');
});

app.use(cors({
    origin:'http://localhost:4200'
}))


app.post('/submit',(req,res)=>{
    console.log(req.body);
    var sql = "insert into m_service_type set ?";
    var data = {
        servicetypename:req.body.servicetypename,
        description:req.body.description,
        displayorder:req.body.displayorder,
        pictureid:req.body.pictureid,
        active:req.body.active,
        worktype:req.body.worktype,
        NoOfCustomerQuestions:req.body.numberofcustomerquestions,
        isadminapprovalneeded:req.body.isadminapprovalneeded,
        suggestedbiddurationindays:req.body.suggestedbiddurationindays,
        isattachmentallowed:req.body.isattachmentallowed,
        currencycode:req.body.currencycode,
        amount:req.body.amount,
        credits:req.body.credits
    }
    db.query(sql,data,(error,result)=>{
        if(error){ 
            res.send({
                status:false,
                statusCode:500,
                message:'Failed',
                error:error
            })
        }
        if(result){
            res.send({
                status:true,
                statusCode:200,
                message:'inserted',
                data:result
            })
        }
    })
})

app.get('/view',(req,res)=>{
    sql = "select * from m_service_type";
    db.query(sql,(error,result)=>{
        if(error) throw error;
        if(result){
            res.send({
                data:result
            })
        }
    })
})
