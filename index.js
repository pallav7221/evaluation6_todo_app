let button = document.querySelector("#button");
button.addEventListener("click", async () => {
    let title = document.querySelector("#task").value;
    let checkbox = document.querySelector("#checkbox");
    let status = checkbox.checked
    let body = {
        title,
        status

    };

    let res = await fetch("http://localhost:3000/task", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    });
    let data = res.json();
    display(data);





})
let allTask = document.querySelector("#allTask");
const display = async (data) => {
    allTask.innerHTML = "";

    data.forEach((element, idx) => {

        let box = document.createElement("div");

        let para = document.createElement("p")
        para.innerHTML = element.title;

        if (element.status == true) {
            para.style.color = "green"
        }
        else {
            para.style.color = "red"
        }
        let button = document.createElement("button");
        button.innerHTML = "Delete"
        button.onclick = async function () {
            let res = await fetch(`http://localhost:3000/task/${element.id}`, {
                method: "DELETE"
            });
            display(res.json());
        }
        let editButton = document.createElement("button");
        editButton.innerHTML = "EDIT"
        editButton.onclick = async function () {
            localStorage.setItem("taskId", element.id);
            location.href = "./edit.html"

        }
        box.append(para, button, editButton)
        allTask.append(box);


    });

}
const fetchData = async () => {
    let res = await fetch(" http://localhost:3000/task");
    let data = await res.json();
    console.log(data);
    display(data);
}
fetchData()
