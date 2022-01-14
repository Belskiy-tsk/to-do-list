let items = document.querySelector(".item__list");
let text = document.querySelector(".creator__text");
let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
  if (text.value) {
    let token = localStorage.length;
    let content = text.value;
    addItem(token, content);
    text.value = "";
  }
});

viewAllItems();

function addItem(key, text, checkboxStatus) {
  let toDoItem = {
    id: key,
    content: text,
    checkboxStatus: false,
  };
  itemRender(key, text);
  localStorage.setItem(key, JSON.stringify(toDoItem));
}

function itemRender(key, text, itemStatus) {
  let divParent = document.createElement("div");
  divParent.classList = "item";

  let pItem = document.createElement("p");
  pItem.classList = "to-do__item";
  pItem.textContent = `${text}`;

  let divChid = document.createElement("div");
  divChid.classList = "buttons__item";

  let checkboxIcon = document.createElement("input");
  checkboxIcon.type = "checkbox";
  checkboxIcon.name = "done";
  checkboxIcon.id = `${key}`;
  checkboxIcon.className = "custom-checkbox";
  if (itemStatus){
    checkboxIcon.setAttribute('checked', 'true');
  }

  let labelCheckbox = document.createElement("label");
  labelCheckbox.setAttribute("for", `${key}`);

  let trashIcon = document.createElement("button");
  trashIcon.type = "submit";
  trashIcon.className = "custom__button__delete";
  trashIcon.name = "custom__button__delete";

  let labelTrash = document.createElement("label");
  labelTrash.id = `${key}`;
  labelTrash.className="delete";

  divParent.append(pItem);
  divParent.append(divChid);
  divChid.append(checkboxIcon);
  divChid.append(labelCheckbox);
  divChid.append(trashIcon);
  divChid.append(labelTrash);
  items.append(divParent);

}

function viewAllItems() {
  for (let item = 0; item < localStorage.length; item++) {
    let jsonItemToString = localStorage.getItem(`${item}`);
    let revievedItem = JSON.parse(jsonItemToString);
    let itemContent = revievedItem.content;
    let itemStatus = revievedItem.checkboxStatus;
    itemRender(item, itemContent, itemStatus);
  }
}

items.addEventListener("change", (e) => {
  let checkbox = e.target;
  let jsonItemToString = localStorage.getItem(`${parseInt(e.target.id)}`);
  let revievedItem = JSON.parse(jsonItemToString);
  revievedItem.checkboxStatus = checkbox.checked;
  localStorage.setItem(`${parseInt(e.target.id)}`, JSON.stringify(revievedItem));
});



items.addEventListener("click", (e) => {
  if (e.target.className == 'delete')  {
    for (let i = parseInt(e.target.id); i<localStorage.length-1;i++){
        let next = i + 1;
        let nextTargetItem = JSON.parse(localStorage.getItem(next))
        localStorage.setItem(i, JSON.stringify(nextTargetItem))
    } 
  }
  items.removeChild(items.children[localStorage.length-1])
  localStorage.removeItem(localStorage.length-1);
});