console.log('Loaded!');
var text = document.getElementById('main-text');
text.innerHTML = 'Yala Yolo';

var img = document.getElementById('madi');

var marginleft = 0;
function marginRight(){
    marginleft = marginleft + 5;
    img.style.marginLeft = marginleft+'px';
}

img.onclick =  function() {
    var interval = setInterval(marginRight,100);
};