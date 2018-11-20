import showdown from 'showdown'

var  converter = new showdown.Converter(),
    text      = '# hello, markdown!\nhttp://www.baidu.com',
    html      = converter.makeHtml(text)

showdown.setFlavor('github');
// showdown.setOption('ghCompatibleHeaderId', true);
// showdown.setOption('simplifiedAutoLink', false);
// showdown.setOption('strikethrough', true)

var body = document.querySelector('#app')
body.innerHTML = html

function cancel(e) {
  if (e.preventDefault) { e.preventDefault(); }
  return false;
}

// Tells the browser that we *can* drop on this target
body.addEventListener('dragover', cancel);
body.addEventListener('dragenter', cancel);

body.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // Array of all files

    for (var i=0, file; file=files[i]; i++) {
        if (!file.type.match(/image.*/)) {
            var reader = new FileReader();

            reader.onload = function(e2) {
                // finished reading file data.
                body.innerHTML = converter.makeHtml(e2.target.result)
            }

            reader.readAsText(file); // start reading the file data.
        }
    }
});