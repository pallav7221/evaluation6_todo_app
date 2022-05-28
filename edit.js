const taskId = (localStorage.getItem("taskId"));
console.log(taskId)
const update = async () => {
    let res = await fetch(`http://localhost:3000/task/${taskId}`)
    let data = await res.json();

    const { id, title, status } = data;

    document.querySelector("#task").value = title;
    if (status) {
        document.querySelector("#checkbox").value = "checked";
    }
    document.querySelector("#checkbox").value = "unchecked";
}

async function editTask() {
    let body = {
        title: document.querySelector("#task").value,
        status: document.querySelector("#checkbox").checked,

    };
    let res = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });
    location.href = "./index.html"
}
update();