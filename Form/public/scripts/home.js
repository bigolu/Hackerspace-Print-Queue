/* This function submits the form */
function save_form(){
	function start(){
		document.getElementById('loading').style.visibility = 'visible';
		$('#print_form').html('');
	}

	function done(resText){
		document.getElementById('loading').style.visibility = 'hidden';

		var response = '<h2>' + resText + '</h2>';
		response += '<a href="https://hackerspace-print-form.herokuapp.com/">Back</a>';
		$('#print_form').html(response);
	}

	$('form').unbind('submit').bind('submit', function(e){
		e.preventDefault();

		var options = {
		type: "POST",
		resetForm: true,
		beforeSubmit: start,
		success: done
		};
		$(this).ajaxSubmit(options); //setup ajax request

		return false; //prevents page navigation and default browser submit
	});
}

/* This function ensures all required fields have valid inputs before submitting */
function field_validate(){
	$('#submit').prop("disabled",true); //disable submit button

	/* these two booleans represent validity of field inputs */
	var name = false;
	var netID = false;

	/* validates name field */
	$('input[name=name]').keyup(function(e){
		if($(this).val().indexOf(' ') != -1 && $(this).val().replace(/ /g,'').length > 0){
			$('#valid_name').prop('src', 'images/good.png'); //put a checkmark next to field
			name = true;
		}
		else{
			$('#valid_name').attr('src', 'images/bad.png'); //put an x next to field
			name = false;
		}
	});

	/* validates netID field */
	$('input[name=netID]').keyup(function(e){
		if($(this).val().replace(/ /g,'').length > 2){
			$('#valid_netID').prop('src', 'images/good.png');
			ruid = true;
		}
		else{
			$('#valid_netID').prop('src', 'images/bad.png');
			ruid = false;
		}

		return;
	});

	$('#submit-box').mouseover(function(){
		var files = document.getElementById("files");

		/* Checks if all fields are valid and (0 < number of files < max) */
		if(name == true && ruid == true && (files.files.length > 0 && files.files.length < 11)){
			$('#submit').prop("disabled",false); //enable submit button
			save_form();
		}
		else{
			$('#submit').prop("disabled",true);
		}
	});
}

$(document).ready(field_validate);//validate inputs when document is fully loaded
