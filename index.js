const express = require('express');
const app = express();
const path = require('path');

/*Port the server will run on*/
const port = 8888;

const { Pool, Client } = require('pg')

const pool = new Pool({
	user: process.env.BASELINE_DATABASE_USER,
	host: process.env.BASELINE_DATABASE_HOST,
	database: process.env.BASELINE_DATABASE_NAME,
	password: process.env.BASELINE_DATABASE_PASSWORD,
	port: process.env.BASELINE_DATABASE_PORT,
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
	today = yyyy + '-' + mm + '-' + dd;
	return today;

}

/*portal homepage*/
app.get('/',(req, res) => {
 res.sendFile( __dirname + '/portal/index.html');
});

/*numeracy assessments page*/
app.get('/numeracy_assessments', (req, res) => {
 res.sendFile( __dirname + '/portal/numeracy_assessments.html');
});

/*index of topics*/
app.get('/topics',(req, res) => {
 res.sendFile( __dirname + '/portal/topics-index.html');
});

app.get('/literacy_tests',(req, res) => {
 res.sendFile( __dirname + '/portal/literacy_tests.html');
});

/*Alpha playlists*/
app.get('/alpha_a',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_a.html');
});

app.get('/alpha_b',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_b.html');
});

app.get('/alpha_c',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_c.html');
});

app.get('/alpha_d',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_d.html');
});


/*Bravo Playlists*/
app.get('/bravo_a',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_a.html');
});

app.get('/bravo_b',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_b.html');
});

app.get('/bravo_c',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_c.html');
});

app.get('/bravo_d',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_d.html');
});

/*Pre-Alpha playlists*/
app.get('/prealpha_a',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_a.html');
});

app.get('/prealpha_b',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_b.html');
});

app.get('/prealpha_c',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_c.html');
});

app.get('/prealpha_d',(req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_d.html');
});



/*portal homepage*/
app.get('/', (req, res) => {
 res.sendFile( __dirname + '/portal/index.html');
});

/*index of topics*/
app.get('/topics', (req, res) => {
 res.sendFile( __dirname + '/portal/topics-index.html');
});

app.get('/literacy_tests', (req, res) => {
 res.sendFile( __dirname + '/portal/literacy_tests.html');
});

app.get('/grade_7_revision', (req, res) => {
 res.sendFile( __dirname + '/portal/grade_7_revision.html');
});

/*Alpha playlists*/
app.get('/alpha_a', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_a.html');
});

app.get('/alpha_b', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_b.html');
});

app.get('/alpha_c', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_c.html');
});

app.get('/alpha_d', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/alpha/alpha_d.html');
});


/*Bravo Playlists*/
app.get('/bravo_a', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_a.html');
});

app.get('/bravo_b', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_b.html');
});

app.get('/bravo_c', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_c.html');
});

app.get('/bravo_d', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/bravo/bravo_d.html');
});

/*Pre-Alpha playlists*/
app.get('/prealpha_a', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_a.html');
});

app.get('/prealpha_b', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_b.html');
});

app.get('/prealpha_c', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_c.html');
});

app.get('/prealpha_d', (req, res) => {
 res.sendFile( __dirname + '/portal/playlists/numeracy/prealpha/prealpha_d.html');
});



/*Results dashboard page*/
app.get('/coach', (req, res) => {
 res.sendFile( __dirname + '/dashboard/index.html');
});



/*Numeracy prealpha tests*/
app.get('/num_prealpha_1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/prealpha_1.html');
});

app.get('/num_prealpha_2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/prealpha_2.html');
});

app.get('/num_prealpha_3', (req, res) => {
 res.sendFile( __dirname + '/numeracy/prealpha_3.html');
});


/*Alpha course family
/*Alpha A tests*/
app.get('/num_alpha_a1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_a1.html');
});

app.get('/num_alpha_a2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_a2.html');
});


/*Alpha B tests*/
app.get('/num_alpha_b1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_b1.html');
});

app.get('/num_alpha_b2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_b2.html');
});

/*Alpha C tests*/
app.get('/num_alpha_c1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_c1.html');
});

app.get('/num_alpha_c2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_c2.html');
});

/*Alpha D tests*/
app.get('/num_alpha_d1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_d1.html');
});

app.get('/num_alpha_d2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/alpha_d2.html');
});


/*Bravo course family

/*Bravo A tests*/
app.get('/num_bravo_a1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_a1.html');
});

app.get('/num_bravo_a2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_a2.html');
});

/*Bravo B tests*/
app.get('/num_bravo_b1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_b1.html');
});

app.get('/num_bravo_b2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_b2.html');
});

/*Bravo C tests*/
app.get('/num_bravo_c1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_c1.html');
});

app.get('/num_bravo_c2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_c2.html');
});

/*Bravo D tests*/
app.get('/num_bravo_d1', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_d1.html');
});

app.get('/num_bravo_d2', (req, res) => {
 res.sendFile( __dirname + '/numeracy/bravo_d2.html');
});


/*Litercy tests*/
app.get('/lit_alpha_a1', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_a1.html');
});

app.get('/lit_alpha_a2', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_a2.html');
});

app.get('/lit_alpha_b1', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_b1.html');
});

app.get('/lit_alpha_b2', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_b2.html');
});

app.get('/lit_alpha_c1', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_c1.html');
});

app.get('/lit_alpha_c2', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_c2.html');
});

app.get('/lit_alpha_d1', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_d1.html');
});

app.get('/lit_alpha_d2', (req, res) => {
 res.sendFile( __dirname + '/literacy/alpha_d2.html');
});

app.get('/lit_prealpha_1', (req, res) => {
 res.sendFile( __dirname + '/literacy/prealpha_1.html');
});

app.get('/lit_prealpha_2', (req, res) => {
 res.sendFile( __dirname + '/literacy/prealpha_2.html');
});


/*Grade 7 revision*/

/*grade 7 mock tests*/
app.get('/gr7_mock1', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_mock1.html');
});
app.get('/gr7_mock2', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_mock2.html');
});

app.get('/gr7_test1', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test1.html');
});

app.get('/gr7_test2', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test2.html');
});

app.get('/gr7_test3', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test3.html');
});

app.get('/gr7_test4', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test4.html');
});

app.get('/gr7_test5', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test5.html');
});

app.get('/gr7_test6', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test6.html');
});

app.get('/gr7_test7', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test7.html');
});

app.get('/gr7_test8', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test8.html');
});

app.get('/gr7_test9', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test9.html');
});

app.get('/gr7_test10', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test10.html');
});

app.get('/gr7_test11', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test11.html');
});

app.get('/gr7_test12', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test12.html');
});

app.get('/gr7_test13', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test13.html');
});

app.get('/gr7_test14', (req, res) => {
 res.sendFile( __dirname + '/grade_7/grade7_test14.html');
});


/*Endpoints*/

app.get('/get_server_date', (req, res) => {
	var current_date = get_datetime_string()
	return res.json(current_date)
});

app.get('/sucessful_submit', (req, res) => {
 res.sendFile( __dirname + '/submit/sucessful_submission.html');
});

/*endpoint to get users list as json*/
app.get('/get_users', (req, res, next) => {
  const users_query = {
    /*Query to fetch all users*/
    name: 'fetch-users',
    text: 'SELECT * FROM users'
  }

  /*Callback returns status code and result of query*/
  pool.query(users_query, (err, result) => {
    if (err) {
      console.log(err.stack)
    } else {
    	res.status(200).send(result.rows)
    }
  })


  });


/*endpoint to test count stats list as json*/
app.get('/get_test_count', (req, res, next) => {
  const test_counts_query = {
    /*Query to count the number of tests and group by month end (last day(test date))*/
    name: 'fetch-test-counts',
    text: 'SELECT last_day(test_date::date) as test_month, count(*) as number_of_tests from responses group by last_day(test_date::date) order by last_day(test_date::date) desc'
  }

  /*Callback returns status code and result of query*/
  pool.query(test_counts_query, (err, result) => {
    if (err) {
      console.log(err.stack)
    } else {
    	res.status(200).send(result.rows)
    }
  })


  });

/*endpoint to get all test_responses as json*/
app.get('/get_responses',function(req, res){
	const responses_query = {
	  /*Query to fetch all the responses from the responses table and calculate the score percent for each one*/
	  name: 'fetch-responses',
	  text: 'select u.username,u.first_name,u.last_name,tm.test_name,r.*,round((coalesce(q1::integer,0.0)+ coalesce(q2::integer,0.0)+ coalesce(q3::integer,0.0)+ coalesce(q4::integer,0.0)+ coalesce(q5::integer,0.0)+ coalesce(q6::integer,0.0)+ coalesce(q7::integer,0.0)+ coalesce(q8::integer,0.0)+ coalesce(q9::integer,0.0)+ coalesce(q10::integer,0.0)+ coalesce(q11::integer,0.0)+ coalesce(q12::integer,0.0)+ coalesce(q13::integer,0.0)+ coalesce(q14::integer,0.0)+ coalesce(q15::integer,0.0)+ coalesce(q16::integer,0.0)+ coalesce(q17::integer,0.0)+ coalesce(q18::integer,0.0)+ coalesce(q19::integer,0.0)+ coalesce(q20::integer,0.0)+ coalesce(q21::integer,0.0)+ coalesce(q22::integer,0.0)+ coalesce(q23::integer,0.0)+ coalesce(q24::integer,0.0)+ coalesce(q25::integer,0.0)+ coalesce(q26::integer,0.0)+ coalesce(q27::integer,0.0)+ coalesce(q28::integer,0.0)+ coalesce(q29::integer,0.0)+ coalesce(q30::integer,0.0)+ coalesce(q31::integer,0.0)+ coalesce(q32::integer,0.0)+ coalesce(q33::integer,0.0)+ coalesce(q34::integer,0.0)+ coalesce(q35::integer,0.0)+ coalesce(q36::integer,0.0)+ coalesce(q37::integer,0.0)+ coalesce(q38::integer,0.0)+ coalesce(q39::integer,0.0)+ coalesce(q40::integer,0.0)+ coalesce(q41::integer,0.0)+ coalesce(q42::integer,0.0)+ coalesce(q43::integer,0.0)+ coalesce(q44::integer,0.0)+ coalesce(q45::integer,0.0)+ coalesce(q46::integer,0.0)+ coalesce(q47::integer,0.0)+ coalesce(q48::integer,0.0)+ coalesce(q49::integer,0.0)+ coalesce(q50::integer,0.0)+ coalesce(q51::integer,0.0)+ coalesce(q52::integer,0.0)+ coalesce(q53::integer,0.0)+ coalesce(q54::integer,0.0)+ coalesce(q55::integer,0.0)+ coalesce(q56::integer,0.0)+ coalesce(q57::integer,0.0)+ coalesce(q58::integer,0.0)+ coalesce(q59::integer,0.0)+ coalesce(q60::integer,0.0)+ coalesce(q61::integer,0.0)+ coalesce(q62::integer,0.0)+ coalesce(q63::integer,0.0)+ coalesce(q64::integer,0.0)+ coalesce(q65::integer,0.0)+ coalesce(q66::integer,0.0)+ coalesce(q67::integer,0.0)+ coalesce(q68::integer,0.0)+ coalesce(q69::integer,0.0)+ coalesce(q70::integer,0.0))/testmaxscore,2) as score_pct from responses r left join users u on r.user_id = u.user_id left join test_marks tm on r.test = tm.test_id and r.course = tm.course and r.module = tm.module order by test_date desc'
	}

	/*Callback returns status code and result of query*/
	pool.query(responses_query, (err, result) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    res.status(200).send(result.rows)
	  }
	})

});

app.get('/get_test_marks',(req, res) => {
	const test_marks_query ={
		name: 'fetch-test-marks',
		text: 'SELECT * from test_marks'
	}

	/*Callback returns status code and result of query*/
	pool.query(test_marks_query, (err, result) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    res.status(200).send(result.rows)
	  }
	})


});


app.post('/submit_test', [(req, res,next) => {

	/*simple function to sum values in an array*/
	const reducer = (accumulator, currentValue) => accumulator + Number(currentValue);
		
	response = req.body;
	/*check if response was checkboxes
	will appear as array in response*/

	/*for each response recieved*/
	for (v in response){
		/*if the reponse is of type object(array). Questions with a single response will be of type string*/
	  if (typeof(response[v]) == "object"){
	  	/*use reducer method to get sum of elements*/
	   total = Object.values(response[v]).reduce(reducer,0)
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

	/*properties of response object - user_id,username,q1,q2..*/
	var response_props = Object.keys(response);

	console.log(response);

	/*Get user responses for response_props above as array. Preserve quotes for insertion into database*/
	var uresponses = response_props.map((v) => { return response[v]; });

	/*remove the test date from the reponse props*/
	/*var utest_date = uresponses.pop();*/

	var uresponses_quoted = "'" + uresponses.join("','") + "'";

	/*Insert statement to run on database. test date added as current date from server*/

	var insert_statement = 'INSERT INTO responses('+response_props.toString()+') values ('+uresponses_quoted+')';
	console.log(insert_statement);
	
	// promise
	pool.query(insert_statement)
	  .then(result => {
	    console.log("Promise returned: Test submited sucessfully!")
	  })
	  .catch(e => console.error(e.stack))
	next();}
	, (req,res) => {
		/*Display successful submission page after request sucessful*/
		res.sendFile( __dirname + '/submit/sucessful_submission.html');
}]);

/*An endpoint to delete a test based on user_id, test, course, module, and test date*/
app.post('/overwrite_test', [(req, res,next) => {
	/*get the test response from the request body*/
	response = req.body;

	/*Get the props which we will use as our criteria for deleting the existing test*/
	/*Before inserting the one which has just been submitted*/
	var user_id = response['user_id'];
	var test_done = response['test'];
	var course = response['course'];
	var test_module = response['module'];
	var test_date = response['test_date'];

	/*If the course is a grade_7_revision then delete only the specific test done on the same day,*/
	/*not all tests on the same day in the same course*/
	/*future work. use array instead of direct string comparison in case other courses need this functionality*/
	if(course.indexOf("grade7") !== -1){
		const query_gr7 = 'DELETE FROM responses where user_id=($1) and test=($2) and course=($3) and module=($4) and test_date=($5)'
		const values_gr7 = [user_id,test_done,course,test_module,test_date]

		// callback
		pool.query(query_gr7, values_gr7, (err, res) => {
		  if (err) {
		    console.log(err.stack)
		    res.status(400).send('Could not delete row(s)')
		    res.end()
		  }
		})
	}

	/*For any other test, delete all tests in the same course done on the same day for that user*/
	else{
		const query_other = 'DELETE FROM responses where user_id=($1) and course=($2) and module=($3) and test_date=($4)'
		const values_other = [user_id,course,test_module,test_date]

		// callback
		pool.query(query_other, values_other, (err, res) => {
		  if (err) {
		    console.log(err.stack)
		    res.status(400).send('Could not delete row(s)')
		    res.end()
		  }
		})
	}
	/*send a status of 200 and a success message back to the client*/
	next();}
	,(req,res) => {
		let success_message = "Sucessfully deleted row(s)"
		res.status(200)
		res.send(success_message)
        console.log(success_message)
}]);

app.listen(port, '0.0.0.0', () => {
 console.log('Server running on port ' + port);
});
