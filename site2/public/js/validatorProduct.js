window.addEventListener('load',()=>{

    console.log('validador de producto')
    let productForm = document.querySelector ('#productLoad')
    let productName = document.querySelector('#productName');
    let brand =document.querySelector('#brand');
    let volumen = document.querySelector('#volumen');
    let price = document.querySelector('#price')
    let description = document.querySelector('#productDescription')
    let image = document.querySelector('#imageProduct')
    let errors = document.querySelectorAll('.errors')

    console.log(productForm)

    productForm.onsubmit = function (event){
       
        if(productName.value.length < 2){
            errorproductName.style.display = 'block'            
        }else{ 
            errorProductName.style.display = 'none'
        };
        
        if(brand.value.length < 2){
            errorbrand.style.display = 'block'            
        }else{ 
            errorbrand.style.display = 'none'
        };

        if(volumen.value < 1){
            errorvolumen.style.display = 'block'            
        }else{ 
            errorvolumen.style.display = 'none'
        };

        if(price.value < 0.01){
            errorprice.style.display = 'block'            
        }else{ 
            errorprice.style.display = 'none'
        };
        
        for (let error of errors){
            if(error.style.display == "block"){
                event.preventDefault();
                console.log('Formulario no enviado')
            }
        }

    

       
      
    }


})