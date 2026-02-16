# How to Update Upwork Reviews

Your website reads reviews from the `reviews.js` file. To show your actual Upwork reviews, you just need to paste them into this file.

> [!NOTE]
> We switched from `reviews.json` to `reviews.js` to fix the "Signal Lost" error when viewing the site locally.

## Option 1: Manual Copy-Paste

1.  Open `reviews.js` in your editor.
2.  It starts with `window.reviewsData = [`.
3.  Add your new review object inside the brackets:
    ```javascript
    {
        "client": "Client Name",
        "role": "CEO, Company",
        "rating": 5,
        "text": "Review text here...",
        "verified": true,
        "date": "2026-02-15",
        "project": "Project Title"
    },
    ```

## Option 2: Automatic Extraction

1.  Open your **Upwork Public Profile** in your browser.
2.  Right-click -> **Inspect** -> **Console**.
3.  Paste this script and hit **Enter**:

```javascript
{
    // Scraper Script
    const reviews = [];
    const selectors = ['.air3-card-section', '.fe-ui-job-feedback', '.up-card-section'];
    let reviewElements = [];

    for (const sel of selectors) {
        const found = document.querySelectorAll(sel);
        if (found.length > 0) {
            reviewElements = found;
            break;
        }
    }

    if (reviewElements.length === 0) {
        console.warn("Script couldn't find reviews automatically.");
    } else {
        reviewElements.forEach(card => {
            const feedbackConfig = ['.feedback-text', '.comment', 'p.mb-0'];
            let feedback = null;
            for (const sel of feedbackConfig) {
                const el = card.querySelector(sel);
                if (el) {
                    feedback = el.innerText.trim();
                    break;
                }
            }

            const titleConfig = ['.up-project-title', 'h4', '.job-title'];
            let title = "Development Project";
            for (const sel of titleConfig) {
                const el = card.querySelector(sel);
                if (el) {
                    title = el.innerText.trim();
                    break;
                }
            }
            
            if (feedback) {
                reviews.push({
                    client: "Verified Client",
                    role: "Upwork Client",
                    rating: 5,
                    text: feedback,
                    verified: true,
                    date: new Date().toISOString().split('T')[0],
                    project: title
                });
            }
        });

        if (reviews.length > 0) {
            console.log("SUCCESS! JSON Data:");
            console.log(JSON.stringify(reviews, null, 4));
        } else {
            console.log("No reviews found.");
        }
    }
}
```

4.  Copy the output JSON.
5.  Open `reviews.js`.
6.  Paste your JSON inside the brackets: `window.reviewsData = [ ... PASTE HERE ... ];`
