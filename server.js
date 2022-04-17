const express = require('express');
const app = express();
const os = require('os');
require('dotenv').config();
const path = require('path')



//extraction starts --------------------------------------------


const freeGB = (((os.freemem()/1024)/1024)/1024);
const totalGB = (((os.totalmem/1024)/1024)/1024);
var ut_sec = os.uptime();
var ut_min = ut_sec/60;
var ut_hour = ut_min/60;

ut_sec = Math.floor(ut_sec);
ut_min = Math.floor(ut_min);
ut_hour = Math.floor(ut_hour);

ut_hour = ut_hour%60;
ut_min = ut_min%60;
ut_sec = ut_sec%60;

let OSdata = {
    cpu:os.cpus()[0].model,
    arch: os.arch(),
    homedir: os.homedir(),
    hostname: os.hostname(),
    platform: os.platform(),
    type: os.type(),
    free: freeGB.toFixed(3),
    total: totalGB.toFixed(3),
    hour: ut_hour,
    min: ut_min,
    sec: ut_sec
}


//extraction ends----------------------------------------------

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api',(req, res)=>{
    res.send(OSdata);
});

let port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server is succesfull running at http://localhost:${port}/api`)
});