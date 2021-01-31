window.addEventListener ('load', () =>{

console.log('documento vinculado con exito')

//Validacion del register
let regErrors = document.querySelector('#regErrors')
let form = document.querySelector('#datos')
let name = document.querySelector('#regName');
let lastname = document.querySelector ('#regLastname');
let phone = document.querySelector('#regPhone');
let dni = document.querySelector('#regDni');
let gender = document.querySelector('#regGender');
let email = document.querySelector('#regEmail');
let avatar = document.querySelector('#regAvatar')
let password = document.querySelector('#regPassword')


form.addEventListener('click',(event)=>{
    let errors =[]
    event.preventDefault();
    console.log('Clickeaste en el boton de enviar')

    if (name.value.length<1){
        errors.push("El campo es obligatorio y debe tener al menos dos caracteres")
        
    }
    for (let error of errors){
        regErrors.innerHTML+=`<li>${error}</li>`
    }    

   /* if (name.value.trim().length<1){
        console.log ('EL campo tiene menos de dos caracteres')
    }else{
    console.log ('El campo pasó la verificación')
    } */

})



})

/*
window.addEventListener('load',()=>{

    console.log('Documento script vinculado con éxito')

 //Validacion del login

    let button = document.querySelector('#ingreso')
    let mail = document.querySelector('#campo-mail')
    let password = document.querySelector('#campo-pass')
    let errorsLogin = document.querySelector("#errorsLogin")


    button.onclick = function(event){
        event.preventDefault()
        let errorsLogin = []
        errorsLogin.innerHTML = ''

        if (mail.value<0){
            errorsLogin.push("Ingrese una dirección de correo válida")
        }
        if (password <7){
            errorsLogin.push ("La contraseña debe tener al menos 8 caracteres")
        }
     
        if (errorsLogin.length>0){
            for(const error of errors){
                errorsLogin.innerHTML += `<li> ${error}</li>`
            }
        }
    }
 
    button.addEventListener('click',(event)=>{
        console.log('clickeaste en el boton de submit')
        event.preventDefault()
    })
    
})

*/