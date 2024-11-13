import fs from 'fs';
import { google } from 'googleapis';
import path from 'path';

export const createAndInsertGoogleSheet = async (tariffs: any) => {
    const credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'wildberies-441312-4d411b653a8c.json'), 'utf8'));

    const auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
        ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const drive = google.drive({ version: 'v3', auth });

    try {
        const createResponse = await sheets.spreadsheets.create({
            requestBody: {
                properties: {
                    title: 'Tariffs Data',
                },
                sheets: [
                    {
                        properties: {
                            title: 'stocks_coefs',
                        },
                    },
                ],
            },
        });

        const spreadsheetId = createResponse.data.spreadsheetId;
        if (!spreadsheetId) {
            throw new Error('Failed to create a new spreadsheet or retrieve its ID.');
        }

        console.log(`New Google Sheet created with ID: ${spreadsheetId}`);

        await drive.permissions.create({
            fileId: spreadsheetId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });
        console.log('Google Sheet is now publicly accessible.');

        const header = [
            'Box Delivery and Storage Expr',
            'Box Delivery Base',
            'Box Delivery Liter',
            'Box Storage Base',
            'Box Storage Liter',
            'Warehouse Name',
            'Created At',
            'Updated At',
        ];
        
        const values = tariffs.map((tariff: any) => [
            tariff.boxDeliveryAndStorageExpr,
            tariff.boxDeliveryBase,
            tariff.boxDeliveryLiter,
            tariff.boxStorageBase,
            tariff.boxStorageLiter,
            tariff.warehouseName,
            tariff.created_at,
            tariff.updated_at,
        ]);

        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'stocks_coefs!A1',
            valueInputOption: 'RAW',
            requestBody: {
                values: [header],
            },
        });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'stocks_coefs!A2',
            valueInputOption: 'RAW',
            requestBody: {
                values: values,
            },
        });

        console.log('Google Sheets updated with data successfully!');
    } catch (error: any) {
        console.error('Error creating or updating Google Sheets:', error.message || error);
    }
};
