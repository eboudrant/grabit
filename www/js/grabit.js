
var completed = function (src) {
    console.log('completed: ' + src.value);
    src.value = 'http://';
};

function validateit() {
}

function selectit() {
    var src = document.getElementById('_src');
    src.select();
}

function dropit() {
    
}

function grabit() {
    var vurl, iframe, src;  
    src = document.getElementById('_src');
    vurl = '/grabit?src=' + encodeURI(src.value);
    console.log('downloading: ' + src.value);
    iframe = document.getElementById('_iframe');
    if(!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = '_iframe';
        iframe.style.display = "none";
        iframe.onload = completed(src);
        document.body.appendChild(iframe);
    }
    iframe.src = vurl;
}