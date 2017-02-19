var counter = 0;
var span = document.getElementById('');
var request = new XMLHttpRequest();

request.onreadystatechange = function()
{
    if (request.readyState === XMLHttpRequest.DONE)
    {
        if(request.status === 200)
        {
            var counter = counter+1;
        }
    }
};