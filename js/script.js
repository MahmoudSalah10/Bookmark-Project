
var bookMarkNameInput = document.getElementById("bookmarkName")
var websiteUrlInput = document.getElementById("websiteUrl")
var siteList = []


// condition if localstorage contain data then convert string data to array of object
if (localStorage.getItem("siteContainer") !== null) {
    siteList = JSON.parse(localStorage.getItem("siteContainer"));
    displayData();
}


//add function
function addItem() {

    // advanced solution
    if(
        validationInputs(bookMarkNameInput) && validationInputs(websiteUrlInput) ){
            var site = {
                name: bookMarkNameInput.value,
                url: websiteUrlInput.value
            };
            siteList.push(site);
            localStorage.setItem("siteContainer", JSON.stringify(siteList));
            displayData();
            clearForm();
            console.log(siteList)
        }
        else{
                alert("Site Name or Url is not valid, Please follow these rules :                         1- Site Name must contain at least 3 character                                       2- Site URL must be a valid one")
                
            }

}

//clearform function
function clearForm() {
    bookMarkNameInput.value = null;
    websiteUrlInput.value = null;
}

// display function
function displayData() {
    var content = "";

    for (i = 0; i < siteList.length; i++) {
        content += `<tr>
        <td>${i+1}</td>
        <td class="text-capitalize">${siteList[i].name}</td>
        <td>
            <a href="${siteList[i].url}" target="_blank"><button
            class="btn btn-outline-success" > <span><i class="fa-solid fa-eye"></i></span>
            Visit</button></a>
        </td>
        <td>
            <button class="btn btn-outline-danger" onclick="deleteItem(${i})"><span><i
                        class="fa-solid fa-trash-can"></i></span> Delete</button>
        </td>
    </tr>`
    }

    document.getElementById("tableData").innerHTML = content;
}

// delete function
function deleteItem(deletedIndex){
    siteList.splice(deletedIndex , 1);
    localStorage.setItem("siteContainer", JSON.stringify(siteList));
    displayData();
}

// advanced solution for validation function
function validationInputs(element){
    var text = element.value;
    var regex = {
        bookmarkName:/^.{3,}$/,
        websiteUrl:  /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/
    };
    if(regex[element.id].test(text) == true){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}






