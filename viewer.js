var data=[]
var page = 1;
var start = 0;
var end = 5;
var loadBtn = document.querySelector(".loadBtn");
var request = new XMLHttpRequest()
request.open("get","/data");
request.send()
request.addEventListener("load",function(event){
  data = JSON.parse(request.responseText)
  data = JSON.parse(data);
  appendProducts(data,start,end)

  var bt1 = document.querySelectorAll(".bt1")
  var bt2 = document.querySelectorAll(".bt2")
  eventOnBtn(bt1)
  eventOnBtnView(bt2)


})
var parentDiv = document.querySelector(".products")

function appendProducts(products,start,end){
  if(end>=products.length){
    end = products.length;
    loadBtn.style.display = "none";
  }
  for(var i = start;i<end;i++){
    var container = document.createElement("div");
    container.setAttribute("class","container");
    container.setAttribute("id",products[i]._id);

    var images = document.createElement("div");
    images.setAttribute("class","images");
    container.appendChild(images);
    
    var img = document.createElement("img");
    img.setAttribute("src",products[i].src);
    images.appendChild(img);

    var product = document.createElement("div");
    product.setAttribute("class","product");

    var h1 = document.createElement("h1");
    h1.innerHTML = products[i].name;
    product.appendChild(h1);

    var h2 = document.createElement("h2");
    h2.innerHTML = products[i].price;
    product.appendChild(h2);

    var p = document.createElement("p");
    p.innerHTML = products[i].description;
    p.style.display = "none"
    product.appendChild(p);

    var buttons = document.createElement("div");
    buttons.setAttribute("class","buttons");

    var bt2 = document.createElement("button");
    bt2.setAttribute("class","add bt2");
    bt2.innerHTML = "view";
    buttons.appendChild(bt2) 

    var br = document.createElement("div");
    br.innerHTML = "  "
    br.style.marginTop = "10px"
    buttons.appendChild(br)

    var bt1 = document.createElement("button");
    bt1.setAttribute("class","add bt1");

    bt1.innerHTML = "Add to Cart";
    buttons.appendChild(bt1);  

    product.appendChild(buttons)
    container.appendChild(product)

    parentDiv.appendChild(container);


  }
}   
loadBtn.addEventListener("click",()=>{
  page = page+1;
  start = end;
  end = end*page;
  appendProducts(data,start,end);
  var bt1 = document.querySelectorAll(".bt1")
  var bt2 = document.querySelectorAll(".bt2")
  eventOnBtn(bt1)
  eventOnBtnView(bt2)
})
function toastFunction() {
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

  console.log("clicked")
}

function eventOnBtn(btns){
  btns.forEach(function(btn){
  var request = new XMLHttpRequest();
    request.open("get","/islogin");
    request.send();
    request.addEventListener("load",(ev)=>{
      var status = ev.target.status;
      if(status===401){
        btn.onclick=function(){toastFunction()};
      }else{
        btn.addEventListener("click",eventOnAdd)
      }
    })
  })
}

function eventOnBtnView(btns){
  btns.forEach(function(btn){
  var request = new XMLHttpRequest();
    request.open("get","/islogin");
    request.send();
    request.addEventListener("load",(ev)=>{
      var status = ev.target.status;
      if(status===401){
        btn.onclick=function(){toastFunction()};
      }else{
        btn.addEventListener("click",eventOnViewBtn)
      }
    })
  })
}

function eventOnViewBtn(event){
  event.target.parentElement.parentElement.childNodes[2].style.display = "block"
}

function eventOnAdd(event){
  data = {
    product_name : event.target.parentElement.parentElement.children[0].innerHTML,
    product_price : event.target.parentElement.parentElement.children[1].innerHTML,
    product_id:event.target.parentElement.parentElement.parentElement.id,
    product_image : event.target.parentElement.parentElement.parentElement.children[0].children[0].src,
    product_description:event.target.parentElement.parentElement.children[2].innerHTML

  }

  var request = new XMLHttpRequest();
  request.open("post","/mycart");
  request.setRequestHeader('Content-type', 'application/json')
  request.send(JSON.stringify(data));
  request.addEventListener("load",function(){
    console.log("sent");
  })
  toastFunctionOnSent()
}

function toastFunctionOnSent() {
  var x = document.getElementById("toast");
  x.innerHTML = "SUCESS : ADDED TO CART !!"
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  x.style.backgroundColor = "#47d764";
  console.log("clicked")
}
