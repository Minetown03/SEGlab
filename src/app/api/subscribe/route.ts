import { google } from 'googleapis';
import { NextResponse } from 'next/server';

function getPrivateKey() {
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!key) throw new Error('GOOGLE_PRIVATE_KEY is not defined');
  
  // Remove any extra quotes and replace literal \n with actual newlines
  return key.replace(/\\n/g, '\n').replace(/(^"|"$)/g, '');
}

export async function POST(req: Request) {
  try {
    // Debug: Log the request
    console.log('Received request');

    // Debug: Check environment variables
    const envCheck = {
      hasClientEmail: Boolean(process.env.GOOGLE_CLIENT_EMAIL),
      hasPrivateKey: Boolean(process.env.GOOGLE_PRIVATE_KEY),
      hasSheetId: Boolean(process.env.GOOGLE_SHEET_ID),
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
      sheetId: process.env.GOOGLE_SHEET_ID
    };
    console.log('Environment variables check:', envCheck);

    // Get the private key
    const privateKey = getPrivateKey();
    console.log('Private key length:', privateKey.length);

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Parse request body
    const { email } = await req.json();
    console.log('Processing email:', email);

    // Initialize sheets
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Sheets client initialized');

    // Attempt to append data
    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'A:B',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[email, new Date().toISOString()]],
        },
      });

      console.log('Sheets API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });

      return NextResponse.json({ 
        success: true,
        message: 'Email saved successfully'
      });
    } catch (sheetError: any) {
      console.error('Sheets API Error:', {
        message: sheetError.message,
        code: sheetError.code,
        details: sheetError.response?.data
      });
      throw sheetError;
    }
  } catch (error: any) {
    console.error('Error in POST handler:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
      response: error.response?.data
    });

    return NextResponse.json(
      { 
        error: 'Failed to save email',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
} 