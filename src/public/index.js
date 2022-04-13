// const log = document.getElementById("login");
// log.innerHTML = `
//     <div class="col-3 ">
//         <form class="mb-3" id="loginForm">
//             <div class="mb-3">
//                 <input type="email" name="email" class="form-control" id="mail" required aria-describedby="emailHelp" placeholder="E-mail">
//             </div>
//             <div class="mb-3">
//                 <input type="password" name="pass" class="form-control" id="pass" required placeholder="Password">
//             </div>             
//         <button type="submit" class="btn btn-primary">Submit</button>
//         </form>
//     </div>
//  `;
// //LOGIN USUARIOS Y ADMINS

// const loginForm = document.getElementById('loginForm')
// let prod;
// loginForm.addEventListener('submit', (e)=>{
//     e.preventDefault()
//     let data= new FormData(loginForm)
//     let user ={}
//     data.forEach((value,key)=>user[key]=value)
//     console.log(user)
    
// })

// const cartContainer = document.getElementById('cartContainer')
// const cargarProd = () =>{
//     fetch('/productos'//aca estoy creando productos. Acomodar la direccion
//          ).then(res =>res.json()).then(resp => {
//              console.log(resp.products)
//             resp.products.forEach(prod =>{
//                 console.log(prod)
//                 cartContainer.appendChild= `<div class="card" style="width: 18rem;">
//                                                 <img src="">
//                                                 <div class="card-body">
//                                                 <h5 class="card-title">${prod.title}</h5>
//                                                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                                 <a href="#" class="btn btn-primary">Go somewhere</a>
//                                                 </div>
//                                             </div>`
//             }) 
            
//             })

// }

// cargarProd()