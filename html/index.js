import 'highlight.js/styles/monokai-sublime.css'
import 'github-markdown-css'
import hljs from 'highlight.js'

var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

var html = md.render('# hello, markdown!\ndrag md file.')

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
                body.innerHTML = md.render(e2.target.result)
            }

            reader.readAsText(file); // start reading the file data.
        }
    }
});