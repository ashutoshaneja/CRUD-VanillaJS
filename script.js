var selectedRow = null;
var formData;

function onFormSubmit(){

    if(document.getElementById("country").value==""){
    document.getElementById("country").required = true;
    }
    if(validateMailId()){
    formData = readFormData();
    $('#recordModal').modal('hide');
    if(selectedRow == null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    clearForm();
    }
}

function readFormData(){
    
    document.getElementById("modalButton").value = "Save Record";

    var formData = {};

    formData["firstName"] = document.getElementById("firstName").value; 
    formData["lastName"] = document.getElementById("lastName").value; 
    formData["mailId"] = document.getElementById("mailId").value; 
    formData["country"] = document.getElementById("country").value; 
    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById("userList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.mailId;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.country;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = '<a onClick="editRecord(this)">Edit📝</a> <a onClick="deleteRecord(this)">Delete❌</a>';
}

function clearForm(){
    document.getElementById("createRecordForm").reset();
    selectedRow = null;
}

function editRecord(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("mailId").value = selectedRow.cells[2].innerHTML;
    document.getElementById("country").value = selectedRow.cells[3].innerHTML;
    
    document.getElementById("modalButton").value = "Update Record";
    $('#recordModal').modal('show');
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.mailId;
    selectedRow.cells[3].innerHTML = formData.country;

    selectedrow = null;
}

function deleteRecord(td){
    rowToDelete = td.parentElement.parentElement;
    document.getElementById("userList").deleteRow(rowToDelete.rowIndex);
    clearForm();
}

function searchRecord(){
    let input, filter, table, tr, td, i, textValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("userList");
    tr = table.getElementsByTagName('tr');
    for(i=0;i<tr.length;i++){
        tdFirstName = tr[i].getElementsByTagName("td")[0];
        tdLastName = tr[i].getElementsByTagName("td")[1];
        if(tdFirstName){
            textValue = tdFirstName.textContent || tdFirstName.innerText;
            if(textValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display="";
            }
            else{
                tr[i].style.display = "none";
            }
        }
    }
}

function validateMailId()  
{  
let mail=document.getElementById("mailId").value;  
let atposition=mail.indexOf("@");  
let dotposition=mail.lastIndexOf(".");  
if (atposition<1 || dotposition<atposition+2 || dotposition+2>=mail.length){  
  alert("Please enter a valid e-mail address");  
  document.getElementById("mailId").focus();
  return false
  }  
  return true;
} 
