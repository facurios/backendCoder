

let form = document.getElementById('actualizar')
let mensaje = document.getElementById("mensaje")
let resultado = 0
form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let data = new FormData(form);

     let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch(`/api/productos/${obj.id}`,{
        method:'PUT',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
        
    }).then(async (res) => await res.json() ).then(res => mensaje.innerHTML=`${res.messaje}`)
    
})
// 