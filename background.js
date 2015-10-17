var localData;
//register the open_edit_view (Command+Shift+E) command to open editor.html in a new tab
chrome.commands.onCommand.addListener(function (command) {
  if(command === 'open_edit_view')
    chrome.tabs.create({url:chrome.extension.getURL('editor.html')});
});



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  // log this
  if(changeInfo.url)
    save(changeInfo.url);
});

// refactor this to handle getting existing data and updating in place
// need mechanism to make sure we don't lose data
function save(content) {
  // get existing data
  chrome.storage.sync.get(function(data){
    //console.log(data);
    if('items' in data)
      localData = data;
    else {
      data['items'] = [];
      localData = data;
    }
    var timestamp = new Date();
    var entry = {content:content, timestamp: String(timestamp), type:'url'};
    localData['items'].push(entry);
    chrome.storage.sync.set({'items':localData['items']});
  });


}
