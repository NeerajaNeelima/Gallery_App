const express= require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const {json} =require('body-parser')
const axios=require('axios')

const app=express();



app.use(cors())
app.use(json())

const{parsed : config}=dotenv.config();
// eslint-disable-next-line no-undef
const PORT=process.env.PORT||7000
const BASE_URL=`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`
const auth={
    username : config.API_KEY,
    password : config.API_SECRET
}

app.get('/photoslist',async (req,res)=>{
    const cloudinary=await axios.get(BASE_URL + '/resources/image',{auth,
        params:{
        next_cursor: req.query.next_cursor,
    }})
    return res.send(cloudinary.data)
})
app.get('/search',async (req,res)=>{
    const response = await axios.get(BASE_URL + '/resources/search',{
        auth,
        params :{
            expression : req.query.expression,
        },
    })
    return res.send(response.data)
})


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });