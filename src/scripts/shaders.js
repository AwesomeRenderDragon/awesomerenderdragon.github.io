var NewbShadersList = JSON.parse(JSON.stringify(NewbShaders));

let type
const list = document.body.querySelector(".list")

const headingTitle = document.body.querySelector(".heading-title")

const urlParams = new URLSearchParams(window.location.search)
const search = urlParams.get("list")

const searchName = name => {
  switch (name) {
    case "newbx":
      type = NewbShadersList
      return "Newb X"
    default:
      break
  }
}

headingTitle.innerText = `${searchName(search)} Variants`

type.forEach(element => {
  if (list) {
    const shaderCard = document.createElement("div")
    shaderCard.className = "shader-card"
    const a = document.createElement("a")
    const cardImg = document.createElement("img")
    cardImg.className = "card-img"
    const cardContent = document.createElement("div")
    cardContent.className = "card-content"
    const cardTitle = document.createElement("h3")
    cardTitle.className = "card-title"
    const cardDesc = document.createElement("p")
    cardDesc.className = "card-desc"

    list.append(shaderCard)
    shaderCard.append(a)
    shaderCard.append(cardImg)
    shaderCard.append(cardContent)
    cardContent.append(cardTitle)
    cardContent.append(cardDesc)

    a.href = element.redirect
    cardImg.src = element.img
    cardTitle.innerText = element.title
    cardDesc.innerText = element.desc
  }
})
