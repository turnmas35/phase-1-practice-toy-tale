let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch(`http://localhost:3000/toys`)
.then((response) => response.json())
.then((jsonToys) => jsonToys.forEach(toy => {
  createToy(toy)
}))

}

fetchToys()

const toyContainer = document.getElementById('toy-collection');

function createToy(toy) {
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const button = document.createElement("button")
  const div = document.createElement('div')
  h2.innerText = toy.name
  img.className = "toy-avatar"
  img.src = toy.image
  p.innerText = `${toy.likes} likes`;
  button.className = "like-btn"
  button.setAttribute('id', toy.id)
  button.innerText = 'Like ❤️'
  div.className = 'card'
  toyContainer.append(div)
  div.append(h2, img, p, button)
  
  button.addEventListener('click', () => {
    toy.likes+= 1
    p.textContent = `${toy.likes} likes`;
    updateLikes(toy)
  })

  console.log(toy)
}

function newToy(name, image) {
  const toyData = {
    name: name,
    image: image,
    likes: 0,
  };
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyData)

  })
  .then((response) => response.json())
  .then((toy) => createToy(toy))
}

const toyForm = document.querySelector('.add-toy-form');

toyForm.addEventListener('submit', function (e){
  e.preventDefault();
  console.log(e.target[0].value)
  newToy(e.target[0].value, e.target[1].value)
})

function updateLikes(toy) {
  // const toyLikes = {
  //   likes: 0,
  // };
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)

  })
  .then((response) => response.json())
  .then((toy) => console.log(toy))
}