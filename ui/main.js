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

var names = ['name1','name2','name3','name4'];

var subm = document.getElementById('submit_btn');

var text = document.getElementById('txt');

var li = document.getElementById('namelist')

var list = ' ';
subm.onclick = function(){

    for(var i = 0;i<names.length;i++)
    {
        list += '<li>'+names[i]+'</li>';
    }
    li.innerHTML = list;

};