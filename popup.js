document.addEventListener('DOMContentLoaded', function() {
  var launchBtn = document.getElementById("launch");
  chrome.storage.sync.get("data", function(items) {
 
    if (!chrome.runtime.error) {
	  if(items !=null && items.data !=undefined && items.data !=null)
	  {
		//document.getElementById("data").innerText = items.data;
		document.getElementById("text").value = items.data;
		chrome.extension.getBackgroundPage().background();
		chrome.extension.getBackgroundPage().updateSetting(items.data);
		// message for background scripts
        //chrome.runtime.sendMessage({dob: items.data});
	  }
	  else
	  {
		var datemessage = document.getElementById("error");
		datemessage.insertAdjacentHTML('beforeend', '<small style="color:red">Please Save Your Date Of Birth First.</small>');
	  }
    }
  });
var button = document.getElementById("set");
var about = document.getElementById('about');
about.addEventListener('click', function(){
	chrome.tabs.create({'url': chrome.extension.getURL('about.html')}, function(tab) {
  // Tab opened.
	});
});
/*launchBtn.addEventListener('click', function(){
    chrome.tabs.create();
});
*/
button.addEventListener('click',function() {
  var d = document.getElementById("text").value;
  var pattern =/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/
  
  if(pattern.test(d) && validateDate(d))
  {
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
	else
	{
		$('#error').empty();
		document.getElementById("data").innerText = 'Thank You, your date of birth has been saved.';
		chrome.extension.getBackgroundPage().background();
		chrome.extension.getBackgroundPage().updateSetting(d);
	}
  });
  }
  else{
	var datemessage = document.getElementById("error");
	datemessage.insertAdjacentHTML('beforeend', '<small style="color:red"> Wrong Date Input, Please Try Again.</small>');
  }
  //window.close();
});

});

function validateDate(date)
{
	date = date+':00';
	var datebirthed = moment(date, 'YYYY/MM/DD HH:mm:ss').format("YYYY/MM/DD HH:mm:ss");
	datebirthed = moment(datebirthed,'YYYY/MM/DD HH:mm:ss');
	var datevalid = new Date(Date.parse(date))

	if(datevalid==null || datevalid == undefined)
	{
		return false;
	}
	var dateNow = new Date();
  	dateNow = moment(dateNow,'YYYY/MM/DD HH:mm:ss');
	if(datebirthed>moment(dateNow))
	{
		return false;
	}
	else{
		return true;
	}

}


$(document).ready(function(){

  $('#text').datetimepicker({
    onShow: function(ct){
      this.setOptions({
        maxDate: new Date()
      }); 
    },
  });
});