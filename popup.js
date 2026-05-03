document.addEventListener("DOMContentLoaded", async () => {
  const tabs = await chrome.tabs.query({
    highlighted: true,
    currentWindow: true,
  });

  const tabList = document.getElementById("tabList");
  const countEl = document.getElementById("count");
  const copyBothBtn = document.getElementById("copyBoth");
  const copyUrlsBtn = document.getElementById("copyUrls");

  countEl.textContent = tabs.length;

  if (tabs.length === 0) {
    tabList.innerHTML = '<div class="empty-state">No tabs selected</div>';
    return;
  }

  // Render tab list
  tabs.forEach((tab) => {
    const item = document.createElement("div");
    item.className = "tab-item";

    const favicon = document.createElement("img");
    favicon.src = tab.favIconUrl || "icons/icon16.png";
    favicon.onerror = () => (favicon.src = "icons/icon16.png");

    const info = document.createElement("div");
    info.className = "tab-info";

    const title = document.createElement("div");
    title.className = "tab-title";
    title.textContent = tab.title;

    const url = document.createElement("div");
    url.className = "tab-url";
    url.textContent = tab.url;

    info.appendChild(title);
    info.appendChild(url);
    item.appendChild(favicon);
    item.appendChild(info);
    tabList.appendChild(item);
  });

  // Copy title + URL
  copyBothBtn.addEventListener("click", () => {
    const text = tabs.map((t) => `${t.title}\n${t.url}`).join("\n\n");
    copyAndFlash(text, copyBothBtn);
  });

  // Copy URLs only
  copyUrlsBtn.addEventListener("click", () => {
    const text = tabs.map((t) => t.url).join("\n");
    copyAndFlash(text, copyUrlsBtn);
  });
});

function copyAndFlash(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = "Copied!";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 1500);
  });
}
