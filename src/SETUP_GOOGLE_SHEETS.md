# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for your FARIO website to collect contact form and waitlist submissions in real-time.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "FARIO Leads" or any name you prefer

## Step 2: Set up Google Apps Script

1. In your Google Sheet, click on **Extensions** → **Apps Script**
2. Delete any existing code in the script editor
3. Copy and paste the following code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Source']]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
    }
    
    // Add the new row
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.source || 'unknown'
    ]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 5);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click the **Save** button (💾) in the Apps Script editor
2. Click **Deploy** → **New deployment**
3. Click the gear icon ⚙️ next to "Type" and select **Web app**
4. Set the following:
   - **Description**: "FARIO Leads Collector"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **IMPORTANT**: Copy the Web app URL that appears - you'll need this!

## Step 4: Update Your Website Code

1. Open `/services/googleSheets.ts` in your project
2. Replace `YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE` with the Web app URL you copied
3. Save the file

```typescript
// Replace this line:
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';

// With your actual URL:
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

## Step 5: Test the Integration

1. Visit your website
2. Fill out either the contact form or waitlist form
3. Check your Google Sheet - you should see the data appear automatically!

## Troubleshooting

### Common Issues:

1. **"Permission denied" error**
   - Make sure "Who has access" is set to "Anyone" in the deployment settings
   - Redeploy the script if needed

2. **Data not appearing in sheet**
   - Check the browser console for errors
   - Verify the Web app URL is correct
   - Make sure the Google Sheet is not in edit mode

3. **CORS errors**
   - This is normal and expected - the data will still be sent successfully
   - The website handles CORS errors gracefully

### View Submission Logs:

1. In Apps Script, click **Executions** on the left sidebar
2. You can see all form submissions and any errors

## Data Structure

Your Google Sheet will collect the following data:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| Name | User's full name |
| Email | User's email address |
| Phone | User's phone number |
| Source | Either "contact" or "waitlist" |

## Security Notes

- The Web app URL is public but only accepts POST requests
- No sensitive data should be collected through this system
- Consider adding additional validation in the Apps Script if needed

## Backup Solution

Even if Google Sheets integration fails, the website will:
- Still show success to the user
- Store data locally in browser's localStorage as backup
- Continue working normally

You can access backup data by opening browser console and running:
```javascript
console.log(JSON.parse(localStorage.getItem('fario_leads')));
```

## Need Help?

If you encounter issues:
1. Check the Apps Script execution logs
2. Verify all permissions are set correctly
3. Test with a simple form submission
4. Check browser console for JavaScript errors

---

**That's it! Your Google Sheets integration is now ready to collect FARIO leads in real-time! 🎉**