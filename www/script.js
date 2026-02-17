const endpoint = "https://6967cbc9bbe157c088b309a3.mockapi.io/api/student"

async function getStudents(){
    let response = await fetch(endpoint)
    let data = await response.json();

    console.log(data)
    return data;
}

async function registerStudent(e){
    e.preventDefault()
    let form = e.target.elements
    let user = {
        name: form.Name.value,
        gender: form.Gender.value,
        rollNo: form.RollNo.value,
        address: form.Address.value,
        contactinfo:form.ContactNo.value,

    }
    let res = await fetch(endpoint,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

function createListItem(data){
    let list = document.createElement("li")
    list.classList.add("student-list")
    let para = document.createElement("p")
    para.textcontent = data.RollNo
}

function getStatus( data){
    if(data.IsPresent == true){
        return "Student Present"
    }else{
        return "Mark Present"                                                                                                                                                                                
    }

}

function setStatusText(data, ele){
    if (data.IsPresent == true){
        ele.textContent = "IsPresent"
        ele.classList.add("present")
    }else{
        ele.textContent = "IsAbsent"
        ele.classList.add("absent")
    }

}

async function updateStudent(id,data){

    let api = endpoint + "/" + id;
    let res = await fetch(api,{
        method : "PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(data)

    })
    return await res.JSON
}

async function togglePresent(student){

    updateStudent(student.id, { isPresent: !student.isPresent })
    displaystudents()
    
}
async function deleteStudent(id){
    let api = endpoint + "/" + id;

    let res = await fetch(api,{
method: "DELETE"
    })
    displaystudents()
}

async function displaystudents(){
    let data = await getStudents();
    let mainlist = document.getElementById("student-list")
    mainlist.textContent = ""

    for ( let i = 0;i < data.length; i++){
    let listItem = document.createElement("li")
    let rollNo = document.createElement("p")
    rollNo.textcontent = data[i].rollNo

    let div1 = document.createElement("div")
    let name = document.createElement("p")
    name.textContent = data[i].name
    let gender = document.createElement("p")
    gender.textContent = data[i].gender
    div1.appendChild(name)
    div1.appendChild(gender)   

    let div2 =document.createElement("div")
    let phone = document.createElement("p")
    phone.textcontent =data[i].address;
    let address =document.createElement("p")
    address.textContent = data[i].address
    div2.appendChild(phone)
    div2.appendChild(address)
    div2.classList.add("hide-mobile")
    
    let isPresent = document.createElement("p")
    setStatusText(data[i], isPresent)

    let boxbutton = document.createElement("div")
    let IsPresentbutton = document.createElement("button")
    IsPresentbutton.textContent =  getStatus(data[i])
    IsPresentbutton.classList.add("green-btn")
    isPresent.onclick = () => togglePresent(data[i],IsPresentbutton)
    let removeStudent = document.createElement("button")
    removeStudent.textContent =  "Remove Student"
    removeStudent.classList.add("red-btn")
    removeStudent.onclick = () => deleteStudent(data[i].id)

    boxbutton.appendChild(IsPresentbutton)
    boxbutton.appendChild(removeStudent)

    boxbutton.classList.add("btn-container")

    listItem.appendChild(rollNo)
    listItem.appendChild(div1)
    listItem.appendChild(div2)
    listItem.appendChild(isPresent)
    listItem.appendChild(boxbutton)
    listItem.classList.add("student-lists")

    mainlist.appendChild(listItem)


    }
    document.body.appendChild(mainlist)
}
displaystudents()