// MySql Config #npm install mysql
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "cotizador_web"
});

const express = require("express");
const app = express();
const port = process.env.PORT || 4200;

app.use('/', express.static('dist/mdb-angular-ui-kit-free'));
app.listen(port,()=>{
    console.log("Server ON , port: ", port)
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected Mysql!");
    });
});


// CONSULTAS BD
// Consulta todos los registros de la tabla obras
const getObras = (request, response) => {
  con.query("SELECT * FROM obras", 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getObras").get(getObras);

// Consulta los datos de una obra
const getObra = (request, response) => {
  const id = request.params.id;
  con.query("SELECT * FROM obras WHERE idObra = ?", [id], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getObra/:id").get(getObra);

// Consulta los pisos y deptos de una determinada Obra
const getPisosDeptos = (request, response) => {
  const idObra = request.params.idObra;
  con.query("SELECT * FROM pisos_deptos WHERE idObra = ?", [idObra], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getPisosDeptos/:idObra").get(getPisosDeptos);

// Consulta los pasos de una determinada Obra, Piso y Depto.
const getPasos = (request, response) => {
  const idObra = request.params.idObra;
  const piso = request.params.piso;
  const depto = request.params.depto;
  con.query("SELECT * FROM steps WHERE idObra = ? AND piso = ? AND depto = ?", [idObra,piso,depto], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getPasos/:idObra/:piso/:depto").get(getPasos);

// Consulta un paso.
const getPaso = (request, response) => {
  const ID = request.params.ID;
  const idStep = request.params.idStep;
  con.query("SELECT * FROM steps WHERE ID = ? AND idStep = ?", [ID,idStep], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getPaso/:ID/:idStep").get(getPaso);

// Consulta las opciones de un determinado Paso.
const getOptions = (request, response) => {
  const ID = request.params.ID;
  con.query("SELECT * FROM options WHERE ID = ?", [ID], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getOptions/:ID").get(getOptions);

// Consulta una opcion.
const getOption = (request, response) => {
  const ID = request.params.ID;
  const idStep = request.params.idStep;
  const idOption = request.params.idOption;
  con.query("SELECT * FROM options WHERE ID = ? AND idStep = ? AND idOption = ?", [ID,idStep,idOption], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getOption/:ID/:idStep/:idOption").get(getOption);

// Consulta las opciones de CGI de un Paso determinado.
const getOptionsCGI = (request, response) => {
  const ID = request.params.ID;
  const idStep = request.params.idStep;
  con.query("SELECT * FROM cgi_options WHERE ID = ? AND idStep = ?", [ID,idStep], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getOptionsCGI/:ID/:idStep").get(getOptionsCGI);

// Consulta una opcion de CGI de un Paso determinado.
const getOptionCGI = (request, response) => {
  const ID = request.params.ID;
  const idStep = request.params.idStep;
  const idCGI = request.params.idCGI
  con.query("SELECT * FROM cgi_options WHERE ID = ? AND idStep = ? AND idCGI = ?", [ID,idStep,idCGI], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getOptionCGI/:ID/:idStep/:idCGI").get(getOptionCGI);

// Consulta los Ambientes de un Paso determinado.
const getAmbientesCGI = (request, response) => {
  const ID = request.params.ID;
  const idStep = request.params.idStep;
  con.query("SELECT * FROM cgi_ambientes WHERE ID = ? AND idStep = ?", [ID,idStep], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getAmbientesCGI/:ID/:idStep").get(getAmbientesCGI);


// Consulta un Ambientes determinado.
const getAmbienteCGI = (request, response) => {
  const ID = request.params.ID;
  const idStep = request.params.idStep;
  const idAmbiente = request.params.idAmbiente;
  con.query("SELECT * FROM cgi_ambientes WHERE ID = ? AND idStep = ? AND idAmbiente = ?", [ID,idStep,idAmbiente], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getAmbienteCGI/:ID/:idStep/:idAmbiente").get(getAmbienteCGI);

// Consulta los precios de un Paso determinado de tipo CGI.
const getPricesCGI = (request, response) => {
  const ID = request.params.ID;
  const idStep = request.params.idStep;
  con.query("SELECT * FROM cgi_prices WHERE ID = ? AND idStep = ?", [ID,idStep], 
  (error, results) => {
      if(error)
          throw error;
      response.status(200).json(results);
  });
};
app.route("/getPricesCGI/:ID/:idStep").get(getPricesCGI);

//#############################################################################


//import modules installed at the previous step. We need them to run Node.js server and send emails
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
//configure the Express middleware to accept CORS requests and parse request body into JSON
app.use(cors({origin: "*" }));
app.use(bodyParser.json());
// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  const mailOptions = {
    from: user.from,
    to: user.to,
    subject: user.subject,
    html: user.html
    };
  sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
});

const sendMail = (mailOptions, callback) => {
    const transporter = nodemailer.createTransport({
      host: "c2201675.ferozo.com",
      port: 465,
      secure: 'SSL',
      auth: {
        user: "info@itercode.com.ar",
        pass: "Amoblamientosreno1"
      }
    }); 
    transporter.sendMail(mailOptions, callback);
  }