function domTable() {
    var taskList = JSON.parse(window.localStorage.getItem('roomListStore'));
    var table = document.getElementById("myTable");
    for (i = 0; i < taskList.length; i++){
         var row = table.insertRow(-1);
         var cell1 = row.insertCell(0);
         var cell2 = row.insertCell(1);
         var cell3 = row.insertCell(2);
         var cell4 = row.insertCell(3);
         cell1.innerHTML = taskList[i][0];
         cell2.innerHTML = taskList[i][1];
         cell3.innerHTML = taskList[i][2];
         cell4.innerHTML = taskList[i][3];
    }
    listener();
}

function generateElements(){
    var taskList = [];
    taskList.push(["101","Floor 1","Guest","2"]);
    taskList.push(["102","Floor 1","Guest","2"]);
    taskList.push(["103","Floor 1","Guest","2"]);
    taskList.push(["104","Floor 1","Guest","2"]);
    taskList.push(["201","Floor 2","Guest","2"]);
    taskList.push(["202","Floor 2","Guest","2"]);
    taskList.push(["203","Floor 2","Guest","2"]);
    taskList.push(["204","Floor 2","Guest","2"]);
    window.localStorage.setItem('roomListStore', JSON.stringify(taskList));
    domTable();
    window.location.reload()
}

function removeElements(){
    var table = document.getElementById("myTable");
    var taskList = JSON.parse(window.localStorage.getItem('roomListStore'));
    var selected = JSON.parse(window.localStorage.getItem('taskListSelect'));
    taskList.splice(selected-1, 1);
    localStorage.removeItem('roomListStore');
    window.localStorage.setItem('roomListStore', JSON.stringify(taskList));
    domTable();
    window.location.reload()
}

function clearElements(){
    localStorage.removeItem('roomListStore');
    var taskList = [];
    window.localStorage.setItem('roomListStore', JSON.stringify(taskList));
    var table = document.getElementById("myTable");
    for (i = 1; i < table.length; i++){
        table.deleteRow(i);
    }
    domTable();
    window.location.reload()
}

function listener(){
    $("#myTable tr:not(:first)").click(function() {
        //alert('You clicked row '+ ($(this).index()) );
        var selected = $(this).hasClass("highlight");
        $("#myTable tr").removeClass("highlight");
        if(!selected){
            $(this).addClass("highlight");
        }
        window.localStorage.setItem('taskListSelect', JSON.stringify($(this).index()));
    });
}

function addRoom(){
    var modal = document.getElementById("addModal");
    var accept = document.getElementById("saveModalAdd");
    var cancel = document.getElementById("cancelModalAdd");
    var table = document.getElementById("myTable");
    var taskList = JSON.parse(window.localStorage.getItem('roomListStore'));
    if (taskList==null){
        taskList = [];
    }
    modal.style.display = "block";
    var assignee = document.getElementById("assigneeAdd");
    var name = document.getElementById("nameAdd");
    var completionDate = document.getElementById("dateAdd");
    var notes = document.getElementById("descriptionAdd");
    accept.onclick = function() {
        taskList.push([name.value,assignee.value,completionDate.value,notes.value]);
        localStorage.removeItem('roomListStore');
        window.localStorage.setItem('roomListStore', JSON.stringify(taskList));
        localStorage.removeItem('taskListSelect');
        modal.style.display = "none";
        domTable();
        window.location.reload();
    }
    cancel.onclick = function() {
        modal.style.display = "none";
        window.location.reload();
    }
}

function editRoom(){
    var modal = document.getElementById("editModal");
    var removeModal = document.getElementById("removeModalWarning");
    var save = document.getElementById("saveModalEdit");
    var cancel = document.getElementById("cancelModalEdit");
    var remove = document.getElementById("removeModalEdit");
    var table = document.getElementById("myTable");
    var taskList = JSON.parse(window.localStorage.getItem('roomListStore'));
    var selected = JSON.parse(window.localStorage.getItem('taskListSelect'));
    if (selected == null){
        return;
    }
    modal.style.display = "block";
    var assignee = document.getElementById("assigneeEdit");
    assignee.value = taskList[selected-1][1];
    var name = document.getElementById("nameEdit");
    name.value = taskList[selected-1][0];
    var description = document.getElementById("descriptionEdit");
    description.value = taskList[selected-1][3];
    var date = document.getElementById("dateEdit");
    date.value = taskList[selected-1][2];
    save.onclick = function() {
        var nameInput = document.getElementById("nameEdit");
        var assigneeInput = document.getElementById("assigneeEdit");
        var descriptionInput = document.getElementById("descriptionEdit");
        var dateInput = document.getElementById("dateEdit");
        taskList[selected-1][0] = nameInput.value;
        taskList[selected-1][1] = assigneeInput.value;
        taskList[selected-1][2] = dateInput.value;
        taskList[selected-1][3] = descriptionInput.value;
        localStorage.removeItem('roomListStore');
        window.localStorage.setItem('roomListStore', JSON.stringify(taskList));
        localStorage.removeItem('taskListSelect');
        modal.style.display = "none";
        domTable();
        window.location.reload();
    }
    cancel.onclick = function() {
        modal.style.display = "none";
        window.location.reload();
    }
    remove.onclick = function() {
        removeModal.style.display = "block";
        var removeModalYes = document.getElementById("removeModalYes");
        var removeModalNo = document.getElementById("removeModalNo");
        removeModalYes.onclick = function(){
            taskList.splice(selected-1, 1);
            localStorage.removeItem('roomListStore');
            window.localStorage.setItem('roomListStore', JSON.stringify(taskList));
            removeModal.style.display = "none";
            modal.style.display = "none";
            domTable();
            window.location.reload();
        }
        removeModalNo.onclick = function(){
            removeModal.style.display = "none";
        }
    }
}