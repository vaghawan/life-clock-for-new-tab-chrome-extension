var dob = '';
function background(){


chrome.storage.sync.get("data", function(items) {
 
    if (!chrome.runtime.error) {
      
	  	if(items !=null && items.data !=undefined && items.data !=null)
	  	{
				dob = items.data;
				// message for content scripts.
				chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
				if (changeInfo.status == 'complete') {   
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {dateofbirth: dob}, function(response) {}); 
			 
      			});
   				}
				});
		}
		else
		{
			chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
				if (changeInfo.status == 'complete') {   
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {dateofbirth: undefined}, function(response) {}); 
			 
      			});
   				}
				});
		}
    }
  });
}
function updateSetting (updatedvalue) {
    dob = updatedvalue;
}
background();
/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	chrome.tabs.onCreated.addListener(function(tab){
		chrome.runtime.sendMessage({dateofbirth: request.dob});
		});
	console.log(request.dob);

  return true;

});
*/