var NewbShadersList = JSON.parse(JSON.stringify(NewbShaders));

let type;
let shader;
const headingTitle = document.querySelector(".heading-title");
const headingDesc = document.querySelector(".heading-desc");
const headingImg = document.querySelector(".heading-img");
const summary = document.querySelector(".summary");
const downloads = document.querySelector(".downloads");
const screenshots = document.querySelector(".screenshot-container");
const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("shader");

//
switch (true) {
  case search?.includes("newbx"):
    type = NewbShadersList;
    break;
  default:
    break;
}

type.forEach((element) => {
  if (element.page.search === search) {
    shader = element;
  }
});

const simplifyVersion = (version) => {
  return version.replace(".", "").replace(".", "");
};

const localUpperCase = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

if (shader) {
  headingTitle.innerText = shader.title;
  headingDesc.innerText = shader.desc;
  headingImg.src = shader.img;
  summary.innerText = shader.page.summary;

  if (shader.page.available) {
    if (shader.page.available.includes("android")) {
      const i = document.createElement("img");
      i.src =
        "https://img.shields.io/badge/Android-black?style=flat-square&logo=android";
      i.className = "available";
      headingTitle.parentElement?.prepend(i);
    }
    if (shader.page.available.includes("ios")) {
      const i = document.createElement("img");
      i.src =
        "https://img.shields.io/badge/iOS-0A84E1?style=flat-square&logo=Apple";
      i.className = "available";
      headingTitle.parentElement?.prepend(i);
    }
    if (shader.page.available.includes("windows")) {
      const i = document.createElement("img");
      i.src =
        "https://img.shields.io/badge/Windows-0078D6?style=flat-square&logo=Windows";
      i.className = "available";
      headingTitle.parentElement?.prepend(i);
    }
  }

  let k = 1;
  shader.page.screenshots.forEach((shot) => {
    const d = document.createElement("div");
    const i = document.createElement("img");

    d.className = "shot fade";
    if (k === 1) {
      d.style.display = "block";
    }
    i.src = shot.url;
    i.style.width = "100%";
    d.append(i);
    screenshots.append(d);
    k++;
  });

  shader.page.downloads.forEach((download) => {
    const versionId = `v${simplifyVersion(download.version)}`;
    let sP = document.body.querySelector(`#${versionId}`);

    if (sP) {
    } else {
      const d = document.createElement("details");
      d.id = versionId;
      d.className = "version-details-top";

      const s = document.createElement("summary");
      s.className = "version-title";
      s.innerHTML = `v${download.version}`;

      d.append(s);
      downloads.append(d);

      sP = d;
    }

    download.downloads.forEach((item) => {
      let vP;
      if (vP) {
      } else {
        const d = document.createElement("details");
        d.id = versionId;
        d.className = "version-details";

        const s = document.createElement("summary");
        s.className = "version-title";
        s.innerHTML = `v${item.version} ${item.versionType} ${
          item.support ? `<img src=${item.support} />` : ""
        }`;

        d.append(s);
        sP.append(d);

        vP = d;
      }
      item.files.forEach((file) => {
        const e = document.createElement("div");
        const v = document.createElement("h1");
        const t = document.createElement("div");
        const a = document.createElement("a");

        e.className = "download-item";
        v.className = "download-type";
        a.className = "download-href";
        t.className = "download-os";
        a.href = file.href;
        v.innerText = file.name;
        t.innerText =
          file.os !== "ios" ? localUpperCase(file.os) : file.os.toUpperCase();

        e.append(v, t, a);

        if (vP) {
          vP.append(e);
        }
      });
    });
  });
}
