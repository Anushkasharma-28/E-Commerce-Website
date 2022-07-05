var data = []
var request = new XMLHttpRequest();
request.open("get","/cart");
request.send()
request.addEventListener("load",()=>{
  data = JSON.parse(request.responseText)
  appendProducts(data,0,data.length)
})

var parentDiv = document.querySelector(".products")


function appendProducts(products,start,end){
  for(var i = start;i<end;i++){
    var container = document.createElement("div");
    container.setAttribute("class","container");
    container.setAttribute("id",products[i]._id);

    var images = document.createElement("div");
    images.setAttribute("class","images");
    container.appendChild(images);
    
    var img = document.createElement("img");
    img.setAttribute("src",products[i].product_image);
    images.appendChild(img);

    var product = document.createElement("div");
    product.setAttribute("class","product");

    var h1 = document.createElement("h1");
    h1.innerHTML = products[i].product_name;
    product.appendChild(h1);

    var h2 = document.createElement("h2");
    h2.innerHTML = products[i].product_price;
    product.appendChild(h2);

    var p = document.createElement("p");
    p.innerHTML = products[i].product_description;
    p.style.display = "none";
    product.appendChild(p);

    var quantity = document.createElement("h4");
    quantity.innerHTML = "Quantity : "

    var qt = document.createElement("h5");
    qt.innerHTML = products[i].quantity;
    quantity.appendChild(qt)
    product.appendChild(quantity);

    var buttons = document.createElement("div");
    buttons.setAttribute("class","buttons");

    var bt1 = document.createElement("button");
    bt1.setAttribute("class","bt1 like");

    var plus = document.createElement("i");
    plus.setAttribute("class","fa fa-plus")
    bt1.innerHTML = "+"
    bt1.appendChild(plus);
    buttons.appendChild(bt1);
    plus.addEventListener("click",function(event){
      event.stopPropagation();
       var data = {
        id : event.target.parentElement.parentElement.parentElement.parentElement.id,
        quantity :++event.target.parentElement.parentElement.parentElement.children[3].children[0].innerHTML
      }
      updatecart(data)
    })

    var bt2 = document.createElement("button");
    bt2.setAttribute("class","bt2 like");
    bt2.style.marginLeft = "5px"

    var minus = document.createElement("i");
    minus.setAttribute("class","fa fa-minus")
    bt2.innerHTML = "-"
    bt2.appendChild(minus);
    buttons.appendChild(bt2) 
    minus.addEventListener("click",function(event){
      event.stopPropagation();
      if(event.target.parentElement.parentElement.parentElement.children[3].children[0].innerHTML>0){
        var data = {
          id : event.target.parentElement.parentElement.parentElement.parentElement.id,
          quantity :--event.target.parentElement.parentElement.parentElement.children[3].children[0].innerHTML
        }
        updatecart(data)
      }
    })  

    product.appendChild(buttons)

    var br1 = document.createElement("br") 
    product.appendChild(br1);
    container.appendChild(product)


    var buttons2 = document.createElement("div");
    buttons2.setAttribute("class","buttons");

    var btdel = document.createElement("button");
    btdel.setAttribute("class","del like");
    btdel.innerHTML = "Del"
    btdel.style.marginRight = "5px"
    buttons2.appendChild(btdel);

    btdel.addEventListener("click",function(ev){
      var data = {_id:ev.target.parentElement.parentElement.parentElement.id}
      ev.target.parentElement.parentElement.parentElement.remove();
      removeFromCart(data);

    })

    var btview = document.createElement("button");
    btview.setAttribute("class","view like");
    btview.innerHTML = "View"
    buttons2.appendChild(btview) 

    btview.addEventListener("click",function(ev){
      ev.target.parentElement.parentElement.children[2].style.display = "block";
    })
    
    product.appendChild(buttons2)

    parentDiv.appendChild(container);

    bt1.addEventListener("click",(ev)=>{
      var data = {
        id : ev.target.parentElement.parentElement.parentElement.id,
        quantity :++ev.target.parentElement.parentElement.children[3].children[0].innerHTML
      }
      updatecart(data)
    })

    bt2.addEventListener("click",(ev)=>{
      if(ev.target.parentElement.parentElement.children[3].children[0].innerHTML>0){
        var data = {
          id : ev.target.parentElement.parentElement.parentElement.id,
          quantity :--ev.target.parentElement.parentElement.children[3].children[0].innerHTML
        }
        updatecart(data)
      }  
    })
  }
}

function updatecart(data){
  var request = new XMLHttpRequest();
  request.open("post","/updatecart");
  request.setRequestHeader('Content-type', 'application/json')
  request.send(JSON.stringify(data));
  request.addEventListener("load",function(){
    console.log("sent");
  })
}

function removeFromCart(data){
  var request = new XMLHttpRequest();
  request.open("post","/removecart");
  request.setRequestHeader('Content-type', 'application/json')
  request.send(JSON.stringify(data));
  request.addEventListener("load",function(){
    console.log("sent");
  })
}

