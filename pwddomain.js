const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const pwddomain = async(data) => {
    var result;
    try {

        const clxn = client.db("storage").collection("domainpwds");

        await clxn.insertOne(data).then((res) => {
            result = res;
            console.log(result);
        });
    }
    catch (e) {

        console.log(e);
        
    }
    return result;
}
const getpwddomain = async() => {
    var result=[];
    try {

        const clxn = client.db("storage").collection("domainpwds");

        await clxn.find().forEach((d)=>{
            result.push(d);
        });
    }
    catch (e) {

        console.log(e);
        
    }
    return result;
}
module.exports = { pwddomain,getpwddomain }
