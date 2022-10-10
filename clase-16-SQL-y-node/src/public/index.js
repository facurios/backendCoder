const socket = io.connect();

socket.on("from-server-messages", (data) => {
    console.log(data)
    console.log('que falla')
    // dar vuelta el array para poder mostrarlo de atras para adelante...
    let array = []
    data.map(msj => array.unshift(msj))
    render(array);
});

function render(data) {
    if(data.length=== 0) {
        document.getElementById("alert").innerHTML= "<p>No hay mensajes</p>"
        return
    }
 
  const cuerpoChatHTML = data.map((msg) => {
      return(
      `<div>
        <strong style="color: blue"> ${msg.author}: </strong>
        <span style="color: brown"> [${msg.date}]: </span>
        <em style="color: green"> ${msg.text} </em>
      </div>`)
    })
    .join("<hr>");
    document.getElementById("alert").innerHTML= ""
    document.getElementById("messages").innerHTML = cuerpoChatHTML;
  
};

document.getElementById('sendBtn').addEventListener('click', () => {
    const inputUser = document.querySelector('#username');
    const inputText = document.querySelector('#text');
    let dateTime = new Date().toLocaleString('en-GB', {timezone: 'UTC'})

    const mensaje = {
        author: inputUser.value,
        text: inputText.value,
        date: dateTime
    }

    socket.emit('from-client-messages', mensaje);

});