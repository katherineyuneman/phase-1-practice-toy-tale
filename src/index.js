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


//render toy list & toy cards
fetch ('http://localhost:3000/toys')
.then(response => response.json())
.then(toys => toys.forEach(toy => {makeToyCard(toy)}))
function makeToyCard(toy){
  // create div
  let toyDiv = document.createElement("div")
  toyDiv.className = "card"
  document.getElementById("toy-collection").appendChild(toyDiv)

  // render toy name
  let header = document.createElement("h2")
  header.textContent = toy.name
  // toyDiv.append(header)

  // render toy image
  let img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"
  // toyDiv.append(img)

  // render number of likes
  let p = document.createElement("p")
  p.textContent = `${toy.likes} Likes`

 
  //number of likes :
  console.log("originalLikes:", toy.name,toy.likes)
   // adjust number of likes

  // toyDiv.append(p)
  let btn = document.createElement("button")
  btn.className = "like-btn"
  btn.id = toy.id
  btn.textContent = "Like <3"
  // toyDiv.append(btn)
  toyDiv.append(header, img, p, btn)
  //
  btn.addEventListener('click',() => {toy.likes +=1;
  p.textContent = `${toy.likes} Likes`;
  patchLikes(toy);
})
}


// add new toy

const addToyForm = document.querySelector('form')
addToyForm.addEventListener('submit', event => {
  // submit event detected
  let newToyObject = {
    name:event.target.name.value,
    image:event.target.image.value,
    likes: 0
  }
  addNewToy(newToyObject)
})


function addNewToy(newToyObject){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(newToyObject)
  })
  .then(resp =>  resp.json())
  // .then(toy => console.log(toy))
}



function patchLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(toy)
  })
  .then(resp =>  resp.json())
  .then(toy =>  console.log(toy))
}