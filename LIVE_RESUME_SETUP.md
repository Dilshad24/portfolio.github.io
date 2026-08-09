# Live resume setup

The portfolio can read its profile data from your master Google Doc. The website keeps working with its built-in details until this is connected.

## One-time Google setup

1. Go to [Google Apps Script](https://script.google.com) while signed into the Google account that owns the resume.
2. Create a new project.
3. Replace the contents of its `Code.gs` file with the contents of `google-apps-script/Code.gs` in this repository.
4. In the resume, use these headings exactly: `PROFESSIONAL SUMMARY`, `SKILLS`, `CONTACT`, and `LOCATION`.
5. Click **Deploy** > **New deployment** > **Web app**.
6. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
7. Click **Deploy**, authorize it, and copy the Web App URL that ends in `/exec`.

For the live Resume page, also set the Google Doc's sharing to **Anyone with the link - Viewer**. This lets visitors view the latest resume directly, while edit access stays private.

## Connect the portfolio

Open `public/portfolio-config.js` and paste the URL here:

```js
resumeApiUrl: 'PASTE_YOUR_EXEC_URL_HERE',
```

Deploy the portfolio once. From then on, edits to the Google Doc update the summary, skill list, email, phone number, and location on the website without another site deployment.

The portfolio does not expose Google edit access, Google credentials, or the complete raw document.
