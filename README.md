# Copy Tab Links — Chrome Extension

Select multiple browser tabs, click the extension icon, and copy their titles and URLs to your clipboard in one click.

## Features

- **Copy Title + URL** — copies each tab's title and URL
- **Copy URLs only** — copies just the URLs
- **Markdown links** — copies each tab as a Markdown link
- **Custom format** — define a template using `<title>` and `<URL>` placeholders
- Shows favicons and previews of selected tabs before copying
- Dark-themed popup UI

## How to Use

1. **Select tabs** — `Ctrl+Click` or `Shift+Click` tabs in Chrome
2. **Click the extension icon** in the toolbar
3. Click **"Copy Title + URL"**, **"URLs only"**, or **"Markdown links"**

To use a custom format, enter a template containing `<title>` and `<URL>`,
choose a separator, then click **"Copy Custom Format"**. Both fields are saved
for the next time the popup is opened. The separator accepts arbitrary text
and the escape sequences `\n` for a new line, `\t` for a tab, and `\\` for a
backslash.

For example, this template:

```text
- [<title>](<URL>)
```

produces:

```markdown
- [Google](https://www.google.com)
- [GitHub](https://github.com)
```

The default separator is `\n`. Other examples include `,`, `, `, or ` | `.

Copied output looks like:

```
Google
https://www.google.com

GitHub
https://github.com
```

Markdown output looks like:

```markdown
- [Google](https://www.google.com)
- [GitHub](https://github.com)
```

## Install (from source)

1. Clone this repo
2. Open `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** → select the cloned folder

## License

MIT
