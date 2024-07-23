import { Shaders } from "../json/shaders";
import "../styles/style.css";

const list = document.body.querySelector(".list") as HTMLDivElement;

Shaders.forEach((element) => {
  if (list) {
    const shaderCard = document.createElement("div");
    shaderCard.className = "shader-card";
    const a = document.createElement("a");
    const cardImg = document.createElement("img");
    cardImg.className = "card-img";
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    const cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    const cardDesc = document.createElement("p");
    cardDesc.className = "card-desc";

    list.append(shaderCard);
    shaderCard.append(a);
    shaderCard.append(cardImg);
    shaderCard.append(cardContent);
    cardContent.append(cardTitle);
    cardContent.append(cardDesc);

    a.href = element.redirect as string;
    cardImg.src = element.img as string;
    cardTitle.innerText = element.title as string;
    cardDesc.innerText = element.desc as string;
  }
});
