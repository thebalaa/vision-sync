//register the open_edit_view (Command+Shift+E) command to open editor.html in a new tab
chrome.commands.onCommand.addListener(function (command) {
  if(command === 'open_edit_view')
    chrome.tabs.create({url:chrome.extension.getURL('editor.html')});
});
