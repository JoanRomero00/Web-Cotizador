const express = require("express");
const app = express();

const port = process.env.PORT || 4200;

app.use('/', express.static('dist/mdb-angular-ui-kit-free'));

app.listen(port,()=>{
    console.log("Server ON , port: ", port)
})