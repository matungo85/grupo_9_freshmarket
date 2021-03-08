window.addEventListener('load', ()=>{

/*********************Validation Login***************************/
    
let loginButton = document.querySelector('#ingreso');
let form = document.querySelector('#formLogin');
let loginMail = document.querySelector('#email');
    let loginPassword = document.querySelector('#pass');

    console.log ('Validacion de login')
    
loginButton.addEventListener('click',function(e){
    console.log(e)
    
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(loginMail.value)){
        errorLoginEmail.style.display = 'none'            
    }else{ 
        errorLoginEmail.style.display = 'block'
    };
    
    if(loginPassword.value.length < 7){
        errorLoginPassword.style.display = 'block'            
    }else{ 
        errorLoginPassword.style.display = 'none'
    };
    
    for (let error of errors){
        if(error.style.display == "block"){
            e.preventDefault();
        }
    }


});

});