//$(document).ready(function(){
	var fb = new Firebase("https://blazing-fire-897.firebaseio.com/tweets");

	var statuses = [];

	var html = [];



	$("#tweet-box").css('height', $(window).height());
	$("#text-box").css('width', $(window).width()/2);
	$("#input").css('width', $(window).width()/2);
	
	$(".alert").hide();
	$("#loading").hide();

	fb.on('value', function(nameSnapshot) {
		$.each(nameSnapshot.val(), function( index, value ) {
			value.statuses.forEach(function(element,index,array){
				statuses.push(element);
			});
		});
		console.log(statuses);
	  
	  statuses.forEach(function(element,index,array){
			$.ajax({

				url: 'https://api.twitter.com/1/statuses/oembed.json?id='+ element.id_str,
				type: 'GET',
				crossDomain: true,
				dataType: 'jsonp',
				success: function(response) { 
					$(response.html).attr('id', element.id_str);
					element.html = response.html;

					//element.html = element.html.splice(0,"\u003Cblockquote".length) + " id = \' " + element.id_str + " \' " + element.html.splice("\u003Cblockquote".length, element.html.length);
					
					$('#tweet-box').append(element.html);
					$($('.twitter-twitter-tweet.twitter-tweet-rendered')[index]).attr('id', element.id_str);
					//console.log(pushed);
				},
				error: function() {   },
			});
		});
	});



	$('#input').keyup(function(){
		$(".jumbotron").hide();
		$("#input").css('top', $(window).height()/2);
		
		var search = $('#input').val();
		var count = 0;
		$('#text-box').css('width', $("#tweet-box").width()/2 + "px");
		$('#tweet-box').show(700);


		var allFalse = true;

		statuses.forEach(function(element,index,array){
			var text = element.text;
			element.show = (text.search(search) > -1);
			
			if(element.show){
				allFalse = false;
				
			}
			
		});
		$("iframe").load(function(){
					
			//$("#loading").hide();
			console.log(ran);

		});

		statuses.forEach(function(element,index,array){
			

			if(allFalse){
				$(".alert").show(500);

			}
	
			

			else{
				$(".alert").hide(500);
				element.show ? $("#twitter-widget-" + index).show() : $("#twitter-widget-" + index).hide();

				

			}

			
			
		});

		
			
			
			

			

	});

//});