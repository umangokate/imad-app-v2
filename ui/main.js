var button = document.getElementById('counter');
var counter = document.getElementById('count');
var cnt = 0;
button.onclick = function()
{
    cnt = cnt+1;
    counter.innerHTML = cnt.toString();
};