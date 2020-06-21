const express = require('express');
const bodyParser = require("body-parser");

const app_srv = express();
const router = express.Router();

const hostname = '127.0.0.1';
const port = 3000;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app_srv.use(bodyParser.urlencoded({ extended: false }));
app_srv.use(bodyParser.json());
app_srv.use("/", router);

router.get('/',(req, res) => {
    res.sendfile("index.html");
  });

router.post('/msg',(req, res) => {
    var txt=req.body.tekst;
    console.log("Message: " + txt);
  });

 router.post('/msg_todb',(req, res) => {
         var txt=req.body.tekst;
         console.log("Message insert do database: " + txt);

         MongoClient.connect(url,
            {
                 useNewUrlParser: true,
                 useUnifiedTopology: true
            },
            function(err, db) {
            if (err) throw err;
        
            var dbo = db.db("kolos_db");
            var doc = { host: "one", Message: txt };
        
            dbo.collection("messages").insertOne(doc, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          }); 

      });
  
app_srv.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
  });