///important resources
//http://www.tothenew.com/blog/connect-to-postgresql-using-javascript/
//-!!!!!!!
//database problems
//-if delete post wont delete comments (no cascade delete added)
//-need to have id set as primary keys for all tables
//-need to fix table blog. body needs to have paragraphs and summary must be inferred from the body. (should handled before sending)

var express = require('express');
var pg = require('pg'); //postgres
var parser = require('body-parser');
const app = express();

app.use(express.static( "public" )); //access pictures and suchs

app.use(parser.json());
//connect to database
var connectionString = "postgres://qztjolhrzsotrl:4f88f9621ee0de6a4cb1f161119f6d7885b37091aaa41428b21d5c6f0e504097@ec2-184-73-167-43.compute-1.amazonaws.com:5432/d462qipcfp5r43";
var pgClient = new pg.Client(connectionString);
pgClient.connect();
//pgClient.query("CREATE TABLE IF NOT EXISTS blog(id SERIAL UNIQUE PRIMARY KEY, title varchar(255) NOT NULL, date date NOT NULL default CURRENT_DATE, summary text NOT NULL, body text NOT NULL)")


// set the view engine to ejs
app.set('view engine', 'ejs')
//-----------------------------------------------------------------------------
pgClient.query("CREATE TABLE IF NOT EXIST locations(id SERIAL UNIQUE PRIMARY KEY, lat double precision, lng double precision)")
//pgClient.query("DROP TABLE blog CASCADE;");
//pgClient.query("CREATE TABLE IF NOT EXISTS blog(id SERIAL UNIQUE PRIMARY KEY, title varchar(255) NOT NULL, date date NOT NULL default CURRENT_DATE, summary text NOT NULL, body text NOT NULL)")
//pgClient.query("CREATE TABLE IF NOT EXISTS comment(id SERIAL UNIQUE PRIMARY KEY,date date NOT NULL default CURRENT_DATE, name varchar(255) NOT NULL, email varchar(255) NOT NULL, comment text NOT NULL, postID Integer NOT NULL REFERENCES blog(id))");
//pgClient.query("CREATE TABLE IF NOT EXISTS projects(id SERIAL UNIQUE PRIMARY KEY, title varchar(255) NOT NULL, date date NOT NULL, url varchar(255) NOT NULL, languages varchar(255) NOT NULL, info text NOT NULL)")
//pgClient.query("INSERT INTO projects(title, date, url,languages, info) values($1,$2,$3,$4,$5)",["Migration of Language and Income","2016-05-4","https://github.com/josuerojasrojas/Migration_of_Language_and_Income","Python","This project was for data science course. It tries to show and answer the question ' Is there a relationship between migration vs language vs income?'"])
//pgClient.query("INSERT INTO projects(title, date, url,languages, info) values($1,$2,$3,$4,$5)",["JukeBox","2017-06-07","https://github.com/josuerojasrojas/JukeBox","HTML, JavaScript, and CSS","This project is a Jukebox that shows basic controls not using the default controls. It can play url mp3s and uses the Spotify to get Spotify preview from song links."])

//-----------------------------------------------------------------------------
// home page
app.get('/', (req, res) => {
  var query = pgClient.query("SELECT title, url, languages, info FROM projects ORDER BY date DESC");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    //return the data to the page
    res.render('home', { data: result.rows, act:"home"})
  });
})

app.get('/map',(req, res) => {
  var query = pgClient.query("SELECT lat, lng FROM locations");
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    //return the data to the page
    res.render('map',{data: result.row, act:"map"})
  });

})

//-----------------------------------------------------------------------------
//blog home
app.get('/blog',(req, res) =>{
  var query = pgClient.query("SELECT id, title, summary FROM blog ");
  query.on("row", function(row, result){
    result.addRow(row);
  });
  query.on("end",function(result){
    res.render('blog',{data:result.rows,act:"blog"})
  });
})

//-----------------------------------------------------------------------------
// blog post
app.get('/blog/:id', (req, res) => {
  //when getting comments must join tables
  var query = pgClient.query("SELECT id, title, body FROM blog WHERE id=" + req.params.id);
  query.on("row", function(row, result){
    result.addRow(row);
  });
  query.on("end",function(result){
    var commentQuery = pgClient.query("SELECT name, comment from comment WHERE postID="+ req.params.id)
    commentQuery.on("row", function(crow, cresult){
      cresult.addRow(crow);
    })
    commentQuery.on("end", function(cresult){
      if(result.rows.length > 0){
        res.render('post',{data:result.rows[0], comment:cresult.rows, act:"blog"}) //send here all data
      }else res.render('404',{ title: "404", act:""})

    })
  });
})

//-----------------------------------------------------------------------------
//post comments/ send to database *chnange the address to include id so i dont have to send it
app.post('/submitComment',function(req, res){
  //console.log(req.body.nameD);
  pgClient.query("INSERT INTO comment(id, date, name, email, comment, postID) values(DEFAULT, DEFAULT, $1, $2, $3, $4)",[req.body.nameD, req.body.emailD, req.body.commentD, req.body.postID]);
});

//-----------------------------------------------------------------------------
//get the comments of the post (this shouldnt be called anywhere else besides the post comments section anyway will add to check if exist later)
app.get('/blog/:id/comments',function(req, res){
  var query = pgClient.query("SELECT name, comment from comment WHERE postID="+ req.params.id)
  query.on("row", function(row, result){
    result.addRow(row);
  })
  query.on("end", function(result){
    //console.log(cresult.rows);
    res.send(result.rows) //send here all data
  })
})
//-----------------------------------------------------------------------------
//show the newpost page (easy peasy)
app.get('/newpost', function(req, res){
  res.render('newpost',{act:"newpost",title:'New Post'})
})
//-----------------------------------------------------------------------------
app.post('/newpost', function(req, res){
  pgClient.query("INSERT INTO blog(id, title, date, summary, body) values(DEFAULT, $1, DEFAULT, $2, $3)",[req.body.title, req.body.summary, req.body.body]);
  res.end('{success : "Updated Successfully", "status" : 200}');
  //res.render('newpost',{act:"newpost",title:'New Post'})
})
//-----------------------------------------------------------------------------
app.post('/delete/:id', function(req, res){
  pgClient.query("Delete from comment WHERE postID="+req.params.id);
  pgClient.query("Delete from blog WHERE id="+req.params.id);
  res.end('{success : "Updated Successfully", "status" : 200}');
})
//-----------------------------------------------------------------------------
app.get('/*',function(req,res){
  res.render('404',{ title: "404", act:""})
})
//-----------------------------------------------------------------------------
console.log('listening on port 8080')
app.listen(process.env.PORT)
