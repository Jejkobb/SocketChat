var inp = document.getElementById('input-box');
var out = document.getElementById('log');
var socket;

socket = io.connect('http://protected-bayou-05600.herokuapp.com/');

function drawMsg(message){
  if(message.length > 0){
    if(message[0] === '/'){
      var temp = message;
      var reg = /[^\/? ]+/;
      temp = temp.match(reg);
      console.log(temp);
    }
  }
  var p = document.createElement('p');
  var pAmt = document.getElementsByClassName('message').length;
  if((pAmt % 2) == 0){
    p.style.backgroundColor = "#444";
  }
  p.innerHTML = message;
  p.className = "message";
  out.prepend(p);
}

function submitMessage(){
  socket.emit('chat message', inp.value);
  inp.value = "";
}

inp.addEventListener("keyup", function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      submitMessage();
    }
});

socket.on('chat message', newMessage);

function newMessage(data){
  drawMsg(data);
}
