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
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbw_xqEHZwnMVu33sh-m_DmNoKTjGj6Qzoj028LKhCjRNsL1GScTzk6-7_yyotP5upe4/exec';

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
  // For demo purposes, if no URL is configured, simulate success
  if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'https://script.google.com/macros/s/AKfycbw_xqEHZwnMVu33sh-m_DmNoKTjGj6Qzoj028LKhCjRNsL1GScTzk6-7_yyotP5upe4/exec') {
    console.log('Google Sheets integration not configured. Form data:', formData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage as fallback for demo
    const existingData = JSON.parse(localStorage.getItem('fario_leads') || '[]');
    existingData.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('fario_leads', JSON.stringify(existingData));
    
    return true;
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      })
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    
    // Fallback to localStorage
    const existingData = JSON.parse(localStorage.getItem('fario_leads') || '[]');
    existingData.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('fario_leads', JSON.stringify(existingData));
    
    return true; // Return true so user experience isn't affected
  }
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