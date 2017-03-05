var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
    
    
  host: 'db.imad.hasura-app.io',
  user: 'umangokate',
  password: process.env.DB_PASSWORD,
  database: 'umangokate',
  port:'5432'
  
  
};
var app = express();
app.use(morgan('combined'));


function createTemplate(data)
{   
    var content = data.content;
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    
    var htmlTemp = `<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class="container">
        <div>
        <a href='/'>Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
            ${content}
        </div>
    </div>
    </body>
</html>`;

return htmlTemp;
    
}


var pool = new Pool(config);

app.get('/test-db',function(req,res){
   
   pool.query('SELECT * FROM test',function(err,result){
      if(err)
      {
          res.status(500).send(err.toString());
      }else
      {
          res.send(JSON.stringify(result));
      }
       
   });
    
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter+1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res){
        
        var name = req.query.name;
        names.push(name);
        res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
    //var articleNa = req.params.articleName;
    
    pool.query("SELECT * FROM articles where title = $1",[req.params.articleName],function(err,result){
        
        if(err)
        {
            res.status(500).send(err.toString());
        }else
        {
            if(result.rows.length === 0)
            {
                res.status(404).send('Article Not found');
            }else
            {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
        
    });
    
 
});

function hash(input,salt)
{
    const crypto = require('crypto');
    var hashedValue = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return hashedValue.toString('hex');
}

app.get('/input/:inputName',function(req,res){
   
   var input = req.params.inputName;
   var hashedValue = hash(input,'umang');
   res.send(hashedValue);
   
    
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
