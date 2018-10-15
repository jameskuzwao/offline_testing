var express = require('express');
var app = express();
var path = require('path');

/*Por the server will run on*/
var port = 5000;

/*Use sqlite3 Database*/
/*const sqlite3 = require('sqlite3').verbose();*/
const { Pool, Client } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

/*Use bodyParser to parse form data*/ 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*Serve static assets from the public folder*/
app.use(express.static(path.join(__dirname,'public')));

/*Return today as string*/
/*Used for timestamping of responses*/
function get_datetime_string() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	/*prefix date with 0 if less than 10(for consisitency with central db)*/
	if(dd<10) {
	    dd = '0'+dd
	} 

	/*prefix month with 0 if less than 10(for consisitency with central db)*/
	if(mm<10) {
	    mm = '0'+mm
	}
	/*return today's date as string*/
	today = "'"+ yyyy + '-' + mm + '-' + dd +"'";
	return today;

}


/*Results dashboard page*/
app.get('/results', function (req, res) {
 res.sendFile( __dirname + '/dashboard/index.html');
});

/*Urls for forms*/

/*Prealpha comp tests*/
app.get('/prealp_comp_1', function (req, res) {
 res.sendFile( __dirname + '/prealp_comp_1.html');
});

app.get('/prealp_comp_2', function (req, res) {
 res.sendFile( __dirname + '/prealp_comp_2.html');
});

app.get('/prealp_comp_3', function (req, res) {
 res.sendFile( __dirname + '/prealp_comp_3.html');
});


/*Alpha comp tests*/
app.get('/alp_comp_1', function (req, res) {
 res.sendFile( __dirname + '/alp_comp_1.html');
});

app.get('/alp_comp_2', function (req, res) {
 res.sendFile( __dirname + '/alp_comp_2.html');
});


/*Alpha sectional tests*/

/*Alpha section A*/
app.get('/alp_sec_a1', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_a1.html');
});

app.get('/alp_sec_a2', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_a2.html');
});


/*Alpha section B*/
app.get('/alp_sec_b1', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_b1.html');
});

app.get('/alp_sec_b2', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_b2.html');
});

/*Alpha section C*/
app.get('/alp_sec_c1', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_c1.html');
});

app.get('/alp_sec_c2', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_c2.html');
});

/*Alpha section D*/
app.get('/alp_sec_d1', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_d1.html');
});

app.get('/alp_sec_d2', function (req, res) {
 res.sendFile( __dirname + '/alp_sec_d2.html');
});


/*Litercy tests*/
app.get('/lit_alp_a1', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_a1.html');
});

app.get('/lit_alp_a2', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_a2.html');
});

app.get('/lit_alp_b1', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_b1.html');
});

app.get('/lit_alp_b2', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_b2.html');
});

app.get('/lit_alp_c1', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_c1.html');
});

app.get('/lit_alp_c2', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_c2.html');
});

app.get('/lit_alp_d1', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_d1.html');
});

app.get('/lit_alp_d2', function (req, res) {
 res.sendFile( __dirname + '/literacy/alp_d2.html');
});

app.get('/lit_prealp_1', function (req, res) {
 res.sendFile( __dirname + '/literacy/prealp_1.html');
});

app.get('/lit_prealp_2', function (req, res) {
 res.sendFile( __dirname + '/literacy/prealp_2.html');
});

/*endpoint to get users list as json*/
app.get('/get_users', (req, res, next) => {
  const users_query = {
    // give the query a unique name
    name: 'fetch-users',
    text: 'SELECT * FROM users'
  }

  // callback
  pool.query(users_query, (err, result) => {
    if (err) {
      console.log(err.stack)
    } else {
    	res.status(200).send(result.rows)
    }
  })

  // promise
  pool.query(users_query)
    .then(result => res.rows)
    .catch(e => console.error(e.stack))
  });

/*endpoint to get all test_responses as json*/
app.get('/get_responses',function(req, res){
        /*let db = new sqlite3.Database(path.join(__dirname,'public/test_responses.sqlite'));*/
        const responses_query = {
          // give the query a unique name
          name: 'fetch-responses',
          text: 'select u.user_id,u.group_name,round((coalesce(q1::integer,0.0)+ coalesce(q2::integer,0.0)+ coalesce(q3::integer,0.0)+ coalesce(q4::integer,0.0)+ coalesce(q5::integer,0.0)+ coalesce(q6::integer,0.0)+ coalesce(q7::integer,0.0)+ coalesce(q8::integer,0.0)+ coalesce(q9::integer,0.0)+ coalesce(q10::integer,0.0)+ coalesce(q11::integer,0.0)+ coalesce(q12::integer,0.0)+ coalesce(q13::integer,0.0)+ coalesce(q14::integer,0.0)+ coalesce(q15::integer,0.0)+ coalesce(q16::integer,0.0)+ coalesce(q17::integer,0.0)+ coalesce(q18::integer,0.0)+ coalesce(q19::integer,0.0)+ coalesce(q20::integer,0.0)+ coalesce(q21::integer,0.0)+ coalesce(q22::integer,0.0)+ coalesce(q23::integer,0.0)+ coalesce(q24::integer,0.0)+ coalesce(q25::integer,0.0)+ coalesce(q26::integer,0.0)+ coalesce(q27::integer,0.0)+ coalesce(q28::integer,0.0)+ coalesce(q29::integer,0.0)+ coalesce(q30::integer,0.0)+ coalesce(q31::integer,0.0)+ coalesce(q32::integer,0.0)+ coalesce(q33::integer,0.0)+ coalesce(q34::integer,0.0)+ coalesce(q35::integer,0.0)+ coalesce(q36::integer,0.0)+ coalesce(q37::integer,0.0)+ coalesce(q38::integer,0.0)+ coalesce(q39::integer,0.0)+ coalesce(q40::integer,0.0)+ coalesce(q41::integer,0.0)+ coalesce(q42::integer,0.0)+ coalesce(q43::integer,0.0)+ coalesce(q44::integer,0.0)+ coalesce(q45::integer,0.0)+ coalesce(q46::integer,0.0)+ coalesce(q47::integer,0.0)+ coalesce(q48::integer,0.0)+ coalesce(q49::integer,0.0)+ coalesce(q50::integer,0.0)+ coalesce(q51::integer,0.0)+ coalesce(q52::integer,0.0)+ coalesce(q53::integer,0.0)+ coalesce(q54::integer,0.0)+ coalesce(q55::integer,0.0)+ coalesce(q56::integer,0.0)+ coalesce(q57::integer,0.0)+ coalesce(q58::integer,0.0)+ coalesce(q59::integer,0.0)+ coalesce(q60::integer,0.0)+ coalesce(q61::integer,0.0)+ coalesce(q62::integer,0.0)+ coalesce(q63::integer,0.0)+ coalesce(q64::integer,0.0)+ coalesce(q65::integer,0.0)+ coalesce(q66::integer,0.0)+ coalesce(q67::integer,0.0)+ coalesce(q68::integer,0.0)+ coalesce(q69::integer,0.0)+ coalesce(q70::integer,0.0))/testmaxscore,2) as score_pct, r.*from responses r join test_marks tm on r.test = tm.test join users u on r.username = u.username'
        }

        // callback
        pool.query(responses_query, (err, result) => {
          if (err) {
            console.log(err.stack)
          } else {
            res.status(200).send(result.rows)
          }
        })

        // promise
        pool.query(responses_query)
          .then(result => res.rows)
          .catch(e => console.error(e.stack))


});


app.post('/submit_test', [function(req, res,next){

	/*simple function to sum values in an array*/
	const reducer = (accumulator, currentValue) => accumulator + Number(currentValue);
		
	response = req.body;
	/*check if respponse response was checkboxes
	will appear as array in response*/

	/*for each response recieved*/
	for (v in response){
		/*if the reponse is of type object(array). Questions with a single response will be of type string*/
	  if (typeof(response[v]) == "object"){
	  	/*use reducer method to get sum of elements*/
	   total = response[v].reduce(reducer,0)
	   /*if the total is less than 0, make the response 0. Wrong responses have -1 mark, so will be negative total*/
	   if(total <= 0){
	    response[v] = '0'
	   }
	   else{
	   	/*if the total is not 0, then only the correct responses were selected. Assign value to 1*/
	    response[v] = '1'
	   }
	  }
	  else {
	  	/*if only one correct response was selected, value will be partial marks. Partial marks are not allowed. Assign the value to 0*/
	  	if(Number(response[v])<1){
	  		response[v] = '0'
	  	}
	  }
	}

	/*Get questions answered as array*/
	var questions = Object.keys(response);

	/*Get answers for questions above as array. Preserve quotes for insertion into database*/
	var answers = questions.map(function(v) { return response[v]; });
	var answers_quoted = "'" + answers.join("','") + "'";

	/*Insert statement to run on database. test date added as current date from server*/
	var insert_statement = 'INSERT INTO responses('+questions.toString()+',test_date) values ('+answers_quoted+','+get_datetime_string()+')';
	console.log(insert_statement);

	/*Open database and run insert satement. Then close database*/
	/*let db = new sqlite3.Database(path.join(__dirname,'public/test_responses.sqlite'));*/
/*	pool.query(insert_statement, (err, result) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    console.log("Test submited sucessfully!")
	  }
	})*/

	// promise
	pool.query(insert_statement)
	  .then(result => {
	    console.log("Promise returned: Test submited sucessfully!")
	  })
	  .catch(e => console.error(e.stack))
	next();}
	, function(req,res){
		/*Display successful submission page after request sucessful*/
		res.sendFile( __dirname + '/sucessful_submission.html');
}]);

app.listen(process.env.PORT || 5000);
