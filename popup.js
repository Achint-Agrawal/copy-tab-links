document.addEventListener("DOMContentLoaded", async () => {
  const defaultCustomFormat = "- [<title>](<URL>)";
  const defaultCustomSeparator = "\\n";
  const tabs = await chrome.tabs.query({
    highlighted: true,
    currentWindow: true,
  });

  const tabList = document.getElementById("tabList");
  const countEl = document.getElementById("count");
  const copyBothBtn = document.getElementById("copyBoth");
  const copyUrlsBtn = document.getElementById("copyUrls");
  const copyMarkdownBtn = document.getElementById("copyMarkdown");
  const customFormatInput = document.getElementById("customFormat");
  const customSeparatorInput = document.getElementById("customSeparator");
  const copyCustomBtn = document.getElementById("copyCustom");

  customFormatInput.value =
    localStorage.getItem("customFormat") || defaultCustomFormat;
  customFormatInput.addEventListener("input", () => {
    localStorage.setItem("customFormat", customFormatInput.value);
  });
  customSeparatorInput.value =
    localStorage.getItem("customSeparator") ?? defaultCustomSeparator;
  customSeparatorInput.addEventListener("input", () => {
    localStorage.setItem("customSeparator", customSeparatorInput.value);
  });

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

  // Copy links in Markdown format
  copyMarkdownBtn.addEventListener("click", () => {
    const text = tabs
      .map((t) => `- [${escapeMarkdownText(t.title)}](${t.url})`)
      .join("\n");
    copyAndFlash(text, copyMarkdownBtn);
  });

  // Copy tabs using the custom format
  copyCustomBtn.addEventListener("click", () => {
    const format = customFormatInput.value;
    const separator = parseSeparator(customSeparatorInput.value);
    const text = tabs
      .map((t) =>
        format
          .replaceAll("<title>", t.title)
          .replaceAll("<URL>", t.url),
      )
      .join(separator);
    copyAndFlash(text, copyCustomBtn);
  });
});

function parseSeparator(separator) {
  return separator
    .replaceAll("\\n", "\n")
    .replaceAll("\\t", "\t")
    .replaceAll("\\\\", "\\");
}

function escapeMarkdownText(text) {
  return text.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]");
}

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
