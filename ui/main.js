var button = document.getElementById('counter');
var counter = document.getElementById('count');


button.onclick =  function(){
    
    var request = new XMLHttpRequest();
    
    request.readyonstatechange = function()
    {
      if(request.readyState == XMLHttpRequest.DONE)
      {
          if(request.status == 200)
          {
              var cnt = request.responseText;
              counter.innerHTML = cnt.toString();
              
          }
      }
    };
};
request.open('GET', 'http://umangokate.imad.hasura-app.io/counter', true);
request.send(null);