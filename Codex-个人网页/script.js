const adminIdentityHashKeys = ["confirmation_token", "email_change_token"];
const passwordIdentityHashKeys = ["invite_token", "recovery_token"];

const redirectIdentityHashToAdmin = () => {
  const hash = window.location.hash || "";
  const isAdminCallback = adminIdentityHashKeys.some((key) => hash.includes(`${key}=`));
  const isPasswordCallback = passwordIdentityHashKeys.some((key) => hash.includes(`${key}=`));
  const isAdminPage = window.location.pathname.replace(/\/+$/, "") === "/admin";

  if (isPasswordCallback) {
    const recoveryUrl = new URL("/admin/recovery.html", window.location.origin);
    recoveryUrl.hash = hash.slice(1);
    window.location.replace(recoveryUrl.toString());
    return;
  }

  if (isAdminCallback && !isAdminPage) {
    const adminUrl = new URL("/admin/", window.location.origin);
    adminUrl.hash = hash.slice(1);
    window.location.replace(adminUrl.toString());
  }
};

redirectIdentityHashToAdmin();

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value || "";
  });
};

const setDataText = (key, value) => setText(`[data-text="${key}"]`, value);

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};

const renderContacts = (contacts = []) => {
  const list = document.querySelector("#contactList");
  if (!list) return;
  list.replaceChildren(
    ...contacts.map((item) => {
      const li = createElement("li");
      li.append(createElement("span", "", item.label), document.createTextNode(item.value || ""));
      return li;
    }),
  );
};

const renderStats = (stats = []) => {
  const list = document.querySelector("#statsList");
  if (!list) return;
  list.replaceChildren(
    ...stats.map((item) => {
      const card = createElement("div");
      card.append(createElement("strong", "", item.value), createElement("span", "", item.label));
      return card;
    }),
  );
};

const renderResearch = (items = []) => {
  const list = document.querySelector("#researchList");
  if (!list) return;
  list.replaceChildren(
    ...items.map((item, index) => {
      const card = createElement("article");
      card.append(
        createElement("span", "icon", String(index + 1).padStart(2, "0")),
        createElement("h3", "", item.title),
        createElement("p", "", item.description),
      );
      return card;
    }),
  );
};

const renderPublications = (items = []) => {
  const list = document.querySelector("#publicationList");
  if (!list) return;
  list.replaceChildren(
    ...items.map((item) => {
      const card = createElement("article");
      card.append(
        createElement("time", "", item.year),
        createElement("h3", "", item.title),
        createElement("p", "", item.meta),
      );
      return card;
    }),
  );
};

const renderProjects = (items = []) => {
  const list = document.querySelector("#projectList");
  if (!list) return;
  list.replaceChildren(
    ...items.map((item) => {
      const card = createElement("article");
      card.append(
        createElement("span", "", item.period),
        createElement("h3", "", item.title),
        createElement("p", "", item.description),
      );
      return card;
    }),
  );
};

const renderGallery = (items = []) => {
  const list = document.querySelector("#galleryList");
  if (!list) return;
  list.replaceChildren(
    ...items.map((item) => {
      const figure = createElement("figure");
      const image = createElement("img");
      image.src = item.image;
      image.alt = item.alt || item.caption || "课题组照片";
      figure.append(image, createElement("figcaption", "", item.caption));
      return figure;
    }),
  );
};

const renderTeam = (items = []) => {
  const list = document.querySelector("#teamList");
  if (!list) return;
  list.replaceChildren(
    ...items.map((item) => {
      const card = createElement("article");
      card.append(
        createElement("div", "member-avatar", item.initial),
        createElement("h3", "", item.name),
        createElement("p", "", item.description),
      );
      return card;
    }),
  );
};

const applyContent = (content) => {
  [
    "brandMark",
    "name",
    "labName",
    "fullTitle",
    "avatarText",
    "heroEyebrow",
    "heroTitle",
    "heroIntro",
    "bio",
    "publicationNote",
    "footerTitle",
    "footerSubtitle",
    "email",
  ].forEach((key) => setDataText(key, content[key]));

  document.title = `${content.name || "个人主页"} | ${content.labName || ""}`;
  document.querySelectorAll('[data-href="mailto:email"]').forEach((link) => {
    link.href = `mailto:${content.email || ""}`;
  });
  document.querySelectorAll('[data-src="heroImage"]').forEach((image) => {
    image.src = content.heroImage || "assets/hero-lab.png";
  });

  renderContacts(content.contacts);
  renderStats(content.stats);
  renderResearch(content.research);
  renderPublications(content.publications);
  renderProjects(content.projects);
  renderGallery(content.gallery);
  renderTeam(content.team);
};

fetch("content/site.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    return response.json();
  })
  .then(applyContent)
  .catch((error) => {
    console.error(error);
  });
