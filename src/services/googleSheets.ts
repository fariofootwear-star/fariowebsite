// Google Sheets Integration Service
// This service handles form submissions to Google Sheets

interface FormData {
  name: string;
  email: string;
  phone: string;
  source?: string; // 'contact' | 'waitlist'
  timestamp?: string;
}

// Replace this with your actual Google Sheets Web App URL
// Instructions to set up:
// 1. Create a Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Create a new script with the code provided below
// 4. Deploy as web app and get the URL

// Google Apps Script code to paste in your Google Sheets:
/*
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Name', 'Email', 'Phone', 'Source']]);
    }
    
    // Add the new row
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.source || 'unknown'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
*/

export const submitToGoogleSheets = async (formData: FormData): Promise<boolean> => {
  const GOOGLE_SHEETS_URL =
    'https://script.google.com/macros/s/AKfycbw_xqEHZwnMVu33sh-m_DmNoKTjGj6Qzoj028LKhCjRNsL1GScTzk6-7_yyotP5upe4/exec';

  return new Promise((resolve, reject) => {
    const callbackName = 'jsonpCallback_' + Math.floor(Math.random() * 1000000);
    (window as any)[callbackName] = (response: any) => {
      delete (window as any)[callbackName];
      script.remove();
      if (response.success) resolve(true);
      else reject(response);
    };

    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      source: formData.source || 'unknown',
      callback: callbackName,
    });

    const script = document.createElement('script');
    script.src = `${GOOGLE_SHEETS_URL}?${params.toString()}`;
    script.onerror = () => {
      delete (window as any)[callbackName];
      script.remove();
      reject(new Error('JSONP request failed'));
    };
    document.body.appendChild(script);
  });
};


// Function to get stored leads (for demo/admin purposes)
export const getStoredLeads = (): FormData[] => {
  return JSON.parse(localStorage.getItem('fario_leads') || '[]');
};

// Function to clear stored leads
export const clearStoredLeads = (): void => {
  localStorage.removeItem('fario_leads');
};

export default submitToGoogleSheets;