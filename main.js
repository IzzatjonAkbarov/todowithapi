const api = "https://676a9fb7863eaa5ac0df14f1.mockapi.io/izzatillo";
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const btn = document.getElementById("btn");
const lists = document.querySelector(".lists");
const list = document.querySelector("list");
let currentid = null;
function fechfunc() {
  fetch(api)
    .then((data) => data.json())
    .then((data) => todoadding(data))
    .catch((err) => console.log(err));
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = input.value;

  fetch(api, {
    method: "POST",
    body: JSON.stringify({
      title: inputValue,
      time: getTime(),
      edittime: "12:01",
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      input.value = "";
      fechfunc();
    })
    .catch((err) => console.log(err));
  currentid = e.target.id;
  btn.textContent = `Send`;
});
lists.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn3")) {
    deletefunc(e.target.id);
  }
  if (e.target.classList.contains("btn2")) {
    btn.textContent = "Edit";
    currentid = e.target.id;
    const list =
      e.target.closest("div").previousElementSibling.previousElementSibling
        .textContent;
    input.value = list;
    currentid = e.target.id;
    todoediting(e.target.id);
    btn.textContent = `edit`;
    console.log(input.value);
  }
});
function todoadding(data) {
  lists.innerHTML = "";
  data.forEach((element) => {
    let list = document.createElement("div");
    list.classList.add("list");
    list.innerHTML = `<p>${element.title}</p><p class="time">${element.time}</p>
        <div class="buttons">
          <button id="${element.id}" class="btn btn2">Edit</button>
          <button id="${element.id}" class="btn btn3">Delete</button>
          
        </div>`;
    lists.append(list);
  });
}
function deletefunc(id) {
  fetch(`${api}/${id}`, { method: "DELETE" })
    .then(fechfunc())
    .catch((err) => {
      console.log(err);
    });
}
fechfunc();
function getTime() {
  const date = new Date();
  const hours = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  const minute =
    date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();

  return `${hours}:${minute}`;
}
function todoediting(id) {
  //   api.map((value) => {
  //     console.log(value);
  //   });
  //   fetch(`${api}/${id}`, {
  //     body: JSON.stringify({
  //       title: newvalue,
  //       time: getTime(),
  //       edittime: getTime(),
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   }).then();
}
