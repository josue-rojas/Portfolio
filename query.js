var pg =require('pg');
var connectionString = "postgres://postgres:1234567890@localhost:5432/portfolio";
var pgClient = new pg.Client(connectionString);
pgClient.connect();

pgClient.query("CREATE TABLE IF NOT EXISTS comment(id SERIAL UNIQUE,date date NOT NULL default CURRENT_DATE, name varchar(255) NOT NULL, email varchar(255) NOT NULL, comment text NOT NULL)");
pgClient.end();
//pgClient.query("CREATE TABLE IF NOT EXISTS comment(id SERIAL UNIQUE,date date NOT NULL default CURRENT_DATE, name varchar(255) NOT NULL, email varchar(255) NOT NULL, comment text NOT NULL, postID Integer NOT NULL REFERENCES blog(id))");
//pgClient.query("DROP TABLE comment")


/*
pgClient.query("INSERT INTO blog(title,summary,body)",["First Post Ever!!!","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut efficitur tortor, ut vulputate eros. Donec vehicula fermentum mi, quis gravida lectus aliquet vel. Integer sagittis nulla a diam placerat scelerisque. Praesent posuere faucibus efficitur. Sed in turpis ac arcu aliquet ornare sed vel quam. Nam pretium hendrerit sem id interdum. Cras ultricies malesuada urna quis eleifend. Curabitur accumsan at ante ut semper. Etiam consequat ut tortor nec laoreet.","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut efficitur tortor, ut vulputate eros. Donec vehicula fermentum mi, quis gravida lectus aliquet vel. Integer sagittis nulla a diam placerat scelerisque. Praesent posuere faucibus efficitur. Sed in turpis ac arcu aliquet ornare sed vel quam. Nam pretium hendrerit sem id interdum. Cras ultricies malesuada urna quis eleifend. Curabitur accumsan at ante ut semper. Etiam consequat ut tortor nec laoreet.<p>Mauris nisi velit, lobortis scelerisque mi sed, sollicitudin efficitur erat. Phasellus in lacus felis. Aliquam aliquam leo metus, vel tempus tortor laoreet ac. Aenean id ultrices tellus. Aliquam volutpat porttitor arcu ac vulputate. Sed convallis leo ac rutrum auctor. Nulla libero ligula, posuere in lacus non, ultrices luctus orci.<p>Ut mollis elit nec felis vestibulum auctor. Pellentesque convallis venenatis mauris sit amet mattis. Fusce at urna ac arcu porttitor ornare. Aenean lobortis urna feugiat diam molestie lacinia. Aliquam erat volutpat. Quisque sed ullamcorper augue. Nam vel eros at augue bibendum auctor vitae eu massa. Curabitur egestas ipsum eu ligula eleifend, ut congue erat suscipit. Nunc odio tortor, suscipit quis posuere eget, varius elementum elit.<p>Phasellus ultrices finibus eros, ut faucibus lacus tempus in. Vestibulum volutpat ornare scelerisque. Nulla venenatis, magna ultricies egestas eleifend, metus neque pretium velit, congue cursus eros lectus nec nisl. Morbi eros justo, posuere vitae libero vitae, pellentesque eleifend magna. Nunc a nibh erat. Etiam ac tincidunt sapien, volutpat ullamcorper turpis. Vestibulum malesuada fringilla finibus. Mauris sed iaculis arcu, ac rutrum justo. Sed ut consequat risus. Maecenas facilisis sem luctus eros venenatis feugiat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis tincidunt leo eu eros pretium, id fermentum massa consectetur.<p>Aenean sed elit ac sem aliquam facilisis vel ultricies elit. Integer blandit, lorem in hendrerit consequat, lectus nibh sodales enim, nec interdum ipsum sapien non eros. Donec in leo libero. Sed pellentesque quam nisl, sed ornare lorem hendrerit non. Proin gravida augue eget ante hendrerit, eget hendrerit felis sagittis. In aliquet justo eget semper euismod. Vestibulum viverra neque urna, sit amet blandit enim sollicitudin nec. Praesent mattis elementum arcu sed elementum. Vivamus lacus est, suscipit ut nisl vitae, consequat convallis lectus. Sed sit amet diam consequat augue posuere malesuada non in purus. Sed rutrum varius quam a pretium. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas tristique orci elit. Donec consectetur ut nibh eget tincidunt."]);
*/

//example
/*
pgClient.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
pgClient.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
pgClient.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);

var query = pgClient.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
query.on("row", function (row, result) {
result.addRow(row);
});
query.on("end", function (result) {
console.log(JSON.stringify(result.rows, null, "    "));
pgClient.end();
});


pgClient.query("DROP TABLE emps");

//table used in homepage to get projects and such
pgClient.query("CREATE TABLE IF NOT EXISTS projects(id SERIAL UNIQUE, title varchar(255) NOT NULL, date date NOT NULL, url varchar(255) NOT NULL, languages varchar(255) NOT NULL, info varchar(255) NOT NULL)")


pgClient.query("INSERT INTO projects(title, date, url,languages, info) values($1,$2,$3,$4,$5)",["Revenge","2016-5-30","https://github.com/josuerojasrojas/Revenge","Java","This project was made for video game programming course. It shows parallex scrolling, sprites, simple csv reader, and ps3 controller api"])

pgClient.query("DELETE FROM projects WHERE projects.id=3")
*/

pgClient.end();
