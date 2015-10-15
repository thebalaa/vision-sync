var input, localData;
// wait for extension content to load
document.addEventListener('DOMContentLoaded', function(){

  input = document.querySelector('#input');
// setup enter key listener
  input.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
      console.log(input.value);
      save(input.value);
      input.value = '';
      window.close();
    }
  });

  // get existing data
  chrome.storage.sync.get(function(data){
    console.log(data);
    if('items' in data)
      localData = data;
    else {
      data['items'] = [];
      localData = data;
    }
  });

});



function save(content) {
  var timestamp = new Date();
  var entry = {content:content, timestamp: String(timestamp)};
  localData['items'].push(entry);
  chrome.storage.sync.set({'items':localData['items']});
}