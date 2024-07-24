var NewbShadersList = JSON.parse(JSON.stringify(NewbShaders));
var YSSShadersList = JSON.parse(JSON.stringify(YSS));

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
  case search?.includes("yssrd"):
    type = YSSShadersList;
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
    if (shader.page.available.includes("xbox")) {
      const i = document.createElement("img");
      i.src =
        "https://img.shields.io/badge/Xbox-107c10?style=flat-square&logo=xbox";
      i.className = "available";
      headingTitle.parentElement?.prepend(i);
    }
    if (shader.page.available.includes("switch")) {
      const i = document.createElement("img");
      i.src =
        "https://img.shields.io/badge/Switch-e60012?style=flat-square&logo=nintendoswitch";
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
      const versionId = `${simplifyVersion(item.versionType)}v${simplifyVersion(download.version)}`;
      let vP = document.body.querySelector(`#${versionId}`);
      if (vP) {
      } else {
        const d = document.createElement("details");
        d.id = versionId;
        d.className = "version-details-mid";
        
        const s = document.createElement("summary");
        s.className = "version-title";
        s.innerHTML = `${item.versionType}`;

        d.append(s);
        sP.append(d);

        vP = d;
      }

      let bP;
      if (bP) {
      } else {
        const d = document.createElement("details");
        d.id = versionId;
        d.className = "version-details";

        const s = document.createElement("summary");
        s.className = "version-title";
        s.innerHTML = `v${item.version} ${
          item.support ? `<img src=${item.support} />` : ""
        }`;

        d.append(s);
        vP.append(d);

        bP = d;
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
        a.href = `${shader.page.href}${item.version}/${file.name}`;
        v.innerText = file.name;
        // t.innerText = file.os;

        e.append(v, t, a);

        if (file.os.includes("android")) {
          const android = document.createElement('img')
          android.className = "icon android"
          android.src = './src/assets/icons/android.svg'
          t.append(android)
        }

        if (file.os.includes("windows")) {
          const windows = document.createElement('img')
          windows.className = "icon windows"
          windows.src = './src/assets/icons/windows.svg'
          t.append(windows)
        }

        if (file.os.includes("ios")) {
          const ios = document.createElement('img')
          ios.className = "icon ios"
          ios.src = './src/assets/icons/apple.svg'
          t.append(ios)
        }

        if (bP) {
          bP.append(e);
        }
      });
    });
  });
}
