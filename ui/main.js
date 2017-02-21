var button = document.getElementById('counter');



button.onclick =  function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function()
    {
      if(request.readyState == XMLHttpRequest.DONE)
      {
          if(request.status == 200)
          {
              var cnt = request.responseText;
              var counter = document.getElementById('count');
              counter.innerHTML = cnt.toString();
              
          }
      }
    };
request.open('GET', 'http://umangokate.imad.hasura-app.io/counter', true);
request.send(null);
};
