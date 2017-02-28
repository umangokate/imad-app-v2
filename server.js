var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
    host: 'http://db.imad.hasura-app.io',
  user: 'umangokate',
  password: 'db-umangokate-67657',
  database: 'umangokate',
};
var app = express();
app.use(morgan('combined'));

var articles = 
{
    'article-one' : {title:'Articles',
    heading:'Article One',
    date:'19 Feb 2017',
    content:`<p>
                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
            </p>
            <p>
                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
            </p>
            <p>
                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
            </p>`
    },
    'article-two':{
    title:'Articles',
    heading:'Article Two',
    date:'19 Feb 2017',
    content:`<p>
                This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.This is an article.
            </p>
        `},
    'article-three':{
        title:'Articles',
    heading:'Article Thre',
    date:'19 Feb 2017',
    content:`<p>
                It is ON!
            </p>`
                
        
    }
            
};

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
            ${date}
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
          res.send(JSON.stringfy(result));
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

app.get('/:articleName',function(req,res){
    var articleNa = req.params.articleName;
   res.send(createTemplate(articles[articleNa]));
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
