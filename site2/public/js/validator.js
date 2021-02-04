window.addEventListener ('load', () =>{

    console.log('documento vinculado con exito')

    let form = document.querySelector('#formLogin')
    let name = document.querySelector('#regName')
    //let errorName = document.querySelector('#errorName')
    let lastname = document.querySelector('#regLastname')
    let tel = document.querySelector('#regPhone')
    let dni = document.querySelector('#regDni')
    let gender = document.querySelector('#regGender')
    let email = document.querySelector('#regEmail')
    let avatar = document.querySelector('#regAvatar')
    let password = document.querySelector('#regPassword')
    let errors = document.querySelectorAll('.errors')
    let button = document.querySelector('button')

    let loginMail = document.querySelector('#mail')
    let loginPassword = document.querySelector('#pass')
    let loginButton = document.querySelector('#ingreso')
    console.log (form)
   
    button.addEventListener('click', function(event){
        
        if(name.value.length < 2){
            errorName.style.display = 'block'            
        }else{ 
            errorName.style.display = 'none'
        };

        if(lastname.value.length < 2){
            errorlastname.style.display = 'block'            
        }else{ 
            errorlastname.style.display = 'none'
        };

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value)){
            errorEmail.style.display = 'none'            
        }else{ 
            errorEmail.style.display = 'block'
        };

        if(password.value.length < 7){
            errorpassword.style.display = 'block'            
        }else{ 
            errorpassword.style.display = 'none'
        };

        for (let error of errors){
            if(error.style.display == "block"){
                event.preventDefault();

            }
        }
    })

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

    
    })


})
