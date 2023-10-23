let  input_name = document.querySelector(".input-name")
let  input_age = document.querySelector(".input-age")
let btn = document.querySelector(".btn")
let tables = document.querySelector(".tables")
let number = 0
let z_name = document.querySelector(".z-name") 
let z_age  = document.querySelector(".z-age")
let z_send = document.querySelector(".send")
let z_close = document.querySelector(".close")
let z_div = document.querySelector(".zindex")
let form = document.querySelector(".inputs")
z_div.style.display = "none"

const bus = "http://localhost:8080" +"/todos/"
fetch(bus)
    .then((res) => res.json() )
    .then((res) => reload(res))
    
form.onsubmit = (e) => {
  e.preventDefault()
  let student = {
    name : input_name.value ,
    age : input_age.value
  }
  fetch(bus , {
    method: "post",
    body: JSON.stringify(student),
    headers  :{
      "Content-type" : "application/json"
    }
  }).then(res => {
    if (res.status === 200 || res.status === 201) {
        fetch(bus)
        .then((res) => res.json())
        .then((res) => reload(res))
    }
  })
  
}
 

function reload(arr) {
    tables.innerHTML = ""
    for(let item of arr) {
    let hr = document.createElement("hr")
    let tab = document.createElement("div")
    let span_number = document.createElement("span")
    let span_name = document.createElement("span")
    let span_age = document.createElement("span")
    let div_icons = document.createElement("div")
    let span_delete = document.createElement("span")
    let span_modify = document.createElement("span")
    let hr2 = document.createElement("hr")


    hr.classList.add("hr")
    tab.classList.add("tab")
    span_number.innerHTML = item.id
    span_name.innerHTML= item.name
    span_age.innerHTML= item.age
    div_icons.classList.add("icons")
    span_delete.classList.add("material-symbols-outlined")
    span_delete.innerHTML = "delete"
    span_modify.classList.add("material-symbols-outlined")
    span_modify.innerHTML = "contract_edit"
    hr2.classList.add("hr")

    document.body.append(hr)
    tables.append(hr,tab,hr2)
    tab.append(span_number,span_name,span_age,div_icons)
    div_icons.append(span_delete,span_modify)
     
    if (input_name.value === "") {
        span_name.innerHTML = "Введите имя !"
    }
    if (input_age.value === "") {
        span_age.innerHTML = "Возраст!"
    }
    span_delete.onclick = () => {
        fetch(bus +item.id , {
            method : "delete"

        }).then(res => {
            if (res.status === 200 || res.status === 201 ) {
                hr2.remove()
                tab.remove()
            }
        })
        

    }
    span_modify.onclick = () => {
        z_div.style.display = "flex"
        z_close.onclick = () => {
            z_div.style.display = "none"
        }
        

        let val = {name:input_name.value}

        fetch(bus + item.id, {
            method: "PATCH",
            body: JSON.stringify(val),
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                fetch(bas)
                    .then((res) => res.json())
                    .then((res) => reload(res))

    }})
    }
}

}

btn.onclick = () => {
    number++
    reload()
    


    
}



    

        

