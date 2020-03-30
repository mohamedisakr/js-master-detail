import { people, MONTHS } from "./data.js";

let init = function() {
  loadMaster(people);
};

let loadMaster = function(people) {
  let ul = document.querySelector(".master-list");
  let df = document.createDocumentFragment();
  people.forEach(person => {
    let li = populatePerson(person);
    df.appendChild(li);
  });
  ul.appendChild(df);
};

function populatePerson(person) {
  let li = document.createElement("li");
  li.textContent = person.name;
  li.className = "person";
  li.setAttribute("data-key", person.person_id);
  li.addEventListener("click", showDetails);
  return li;
}

let showDetails = function(ev) {
  let person_id = ev.target.getAttribute("data-key");
  let oldActive = document.querySelector(".active");
  oldActive ? oldActive.classList.remove("active") : null;
  ev.target.classList.add("active");
  let activePerson;
  people.forEach(person => {
    if (person.person_id == person_id) {
      activePerson = person;
    }
  });
  let ul = document.querySelector(".detail-list");
  ul.innerHTML = ""; //clear old list
  let df = document.createDocumentFragment();
  for (let prop in activePerson) {
    let li = document.createElement("li");
    li.classList.add(prop);
    if (prop == "lastAccess") {
      let timmy = new Date(activePerson[prop]);
      let str = `${timmy.getDate()} ${
        MONTHS[timmy.getMonth()]
      } ${timmy.getFullYear()}`;
      li.textContent = str;
    } else {
      li.textContent = activePerson[prop];
    }
    console.log(activePerson);
    df.appendChild(li);
  }
  ul.appendChild(df);
};

document.addEventListener("DOMContentLoaded", init);
