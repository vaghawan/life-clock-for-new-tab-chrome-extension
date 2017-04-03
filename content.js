var dob = 0;
document.addEventListener('DOMContentLoaded', function() {
var dobtoshow = document.getElementById("dob");
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
  if (changeInfo.status == 'complete') { 
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    if(request ==undefined || request == null || request.dateofbirth ==null || request.dateofbirth == undefined )
		{
			 $('#dob').empty().hide();
       $('.whole>#dobset').html('<p id="mes">You have not configured your date of birth yet. <a href="about.html" id="about">Learn More</a></p>');
		}

		else
		{
			dob = request.dateofbirth;
      dateof = dob;
			getHours(dob);
		}
		
    return true;            
});
}
});
background();
quote();

});

function background() {
	var imagecat = ['nature', 'ocean', 'travel','clouds', 'sky', 'mono', 'flores','water','flower','green','light','landscape','trees', 'yellow','moon'];
	var random = imagecat[Math.floor(Math.random()*imagecat.length)];
  // call the flicker api with the call back function.
  $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&extras=url_l&jsoncallback=?", {
    api_key:'0677de6a559772c8cb27dd22219dfa0c',
    tags:random,
    accuracy:1
  }).done(function(data) {
    if (data.photos.pages > 0) {
      var photo = data.photos.photo[0];
      document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
      document.querySelector("#image-source").setAttribute("href", "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id);
	  document.querySelector("#image-source").setAttribute("target","_blank");
    } else {
      document.querySelector("body").style.backgroundImage = "url('https://fourtonfish.com/tutorials/weather-web-app/images/default.jpg')";
      document.querySelector("#image-source").setAttribute("href", "https://www.flickr.com/photos/superfamous/310185523/sizes/o/");
    }
  })/*.error(function(data) {
    console.error(data);
  });*/
}


function quote(){
    $.ajax({
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
        type: 'post',
        data: {

        },
        headers: {
            'X-Mashape-Key': '1Xuhcdh7NsmshWXJ9mNNa3ChMDpvp1fIoBNjsnLnPJiwUxrMGO'
        },
        dataType: 'json',
        success: function(data) {
            //$('body').fadeIn(50);
            $('.real-quote>span>p').text('"' + data.quote + '"');
            $('.author>span>p').text("Author: "+data.author);
            //$('.author>small').text("Category: " + data.category);
            $('#tweet').attr("href","https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text="+ '"' + data.quote + '"' + " - " + data.author+"&tw_p=tweetbutton&via=lifehourchrome" );
        }
    });
}
function getHours(date)
{
	date = date+':00';
  var datebirthed = moment(date, 'YYYY/MM/DD HH:mm:ss').format("YYYY/MM/DD HH:mm:ss");
	var dateNow = new Date();
  dateNow = moment(dateNow,'YYYY/MM/DD HH:mm:ss');
  datebirthed = moment(datebirthed,'YYYY/MM/DD HH:mm:ss');
	//var seconds = Math.floor((dateNow - (datebirthed))/1000);
	var diff_ms = moment(dateNow).diff(datebirthed);
	var dur_obj = moment.duration(diff_ms);
	window.hour = parseInt(dur_obj.asHours());
 

	$('#dob').empty().show();
  $('#dobset').empty();
	setInterval(update, 1000);
	//$('#dob').append(hour +' Hours ' + minutes+' Minutes '+seconds+' Seconds');
}
function update() {
  if(moment().minutes() == 59 && moment().seconds()==59){
    if(window.hour==0)
    {
      window.hour = 1;
    }
    window.hour +=1;
  }
  $('#dob').html(window.hour+' '+moment().format(':mm:ss'));
}
$(document).ready(function(){
$('#btn').click(function(e) {
      e.preventDefault();
       quote();
});

});


 

