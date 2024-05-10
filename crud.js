//get total --price *
//create product
//save localstorage
//clear inputs
//read data
//count
//delete
//update
//search
//clean data--valdation

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
 

let mood= 'create';
let tmp;
//  console.log(title,price,taxes,ads,discount,total,count,submit);


 function getTotal() {
    if(price.value !='')
    {
        let result= (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML=result
        total.style.background='green'    
    }
   else {
        total.innerHTML=''
        total.style.background='#a00d02'  
      }
 }

 //crearte product
 let dataProduct;
 if(localStorage.newProductx !=null){
    dataProduct=JSON.parse(localStorage.newProductx)

 }else{ 
    dataProduct = []
 }
 
 submit.onclick = function(){

    let newProduct ={
        title:title.value.toLowerCase(),
        taxes:taxes.value,
        price:price.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()

    }
    if(title.value !='' 
    && price.value !=''
    && category.value !=''
    && newProduct.count<100)
    {
    if(mood === 'create'){
    if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
             dataProduct.push(newProduct);
        }
    }else {
        dataProduct.push(newProduct);
    }
}
//update
    else{

             dataProduct[tmp]=newProduct;
             submit.innerHTML='create';
             mood='create';
             count.style.display='block';
            //  total.style.background='red'
            }
             //clear inputs
       clearInputs();
        }
          //save localstorage
    localStorage.setItem('newProductx',JSON.stringify(dataProduct))
    
      
       showData() ;
  
}
        

 
 //clear Inputs
 function clearInputs() {
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''
}

//read data in table

     function showData() {
        getTotal();

        let table = '';
        
            for (let i = 1; i < dataProduct.length; i++) {
               table +=`
               
                        <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button id="update" onclick="updateData(${i})" >update</button></td>
                            <td><button id="delete" onclick="deleteData(${i})" >delete</button></td>
                        </tr>
               `
           
            }
            
            document.getElementById('tbody').innerHTML = table;
            
            let btnDeleteAll=document.getElementById('deleteAll');
            if(dataProduct.length>1){
                btnDeleteAll.innerHTML= `
                <button onclick ="deleteAll()">delete All (${(dataProduct.length)-1})</button>
                `
            }else{
                btnDeleteAll.innerHTML='';
            }
        }
        showData() ;
 
        //delete
        function deleteData(i) {

          dataProduct.splice(i,1)
          localStorage.newProductx=JSON.stringify(dataProduct)
          showData() ; 

        }

        //deleteAll
        function deleteAll() {
            localStorage.clear();
            dataProduct.splice(0);
            showData() ;

         }
        //update
        function updateData(i) {
            // dataProduct.value
             title.value=dataProduct[i].title
             taxes.value=dataProduct[i].taxes,
             price.value=dataProduct[i].price,
             ads.value=dataProduct[i].ads,
             discount.value=dataProduct[i].discount,
             getTotal(i)
              count.style.display='none'
             category.value=dataProduct[i].category
             submit.innerHTML="update"
             mood='update';
             tmp=i;
             scroll({
                top:0,
                behavior:"smooth",
                
             })
        }

        //search
        let searchMood = 'title';

        function getSearchMood(id) {
            let search=document.getElementById('search')
             if (id == 'searchTitle') {
                searchMood = 'title'
                // search.placeholder = 'Seacrh By Title'
            } else {
                searchMood = 'category'
                // search.placeholder = 'Seacrh By Category'

            }
            search.placeholder = 'Seacrh By ' + searchMood
            search.focus()
            search.value = ''
            showData();
         }

         function searchData(value)
         {
            let table = ' ';
            for (let i = 1; i < dataProduct.length; i++) {
            if (searchMood == 'title') {
                     if(dataProduct[i].title.includes(value.toLowerCase())){
                        table +=`
               
                        <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button id="update" onclick="updateData(${i})" >update</button></td>
                            <td><button id="delete" onclick="deleteData(${i})" >delete</button></td>
                        </tr>
               `
 
                    }              
                
            } else {
                     if(dataProduct[i].category.includes(value.toLowerCase())){
                        table +=`
               
                        <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td><button id="update" onclick="updateData(${i})" >update</button></td>
                            <td><button id="delete" onclick="deleteData(${i})" >delete</button></td>
                        </tr>
               `
 
                    }              
                }
            }
            document.getElementById('tbody').innerHTML = table;


         }

          
