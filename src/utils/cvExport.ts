import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import { educationData, experienceData, profileData } from '../data/cvData';

// Option 1: Use pre-made PDF from assets (Recommended - smaller file size)
// To use this, place your CV PDF file in assets/documents/cv.pdf and uncomment below:
// import { Asset } from 'expo-asset';
// const CV_PDF_ASSET = require('../../assets/documents/cv.pdf');

// Option 2: Generate PDF dynamically (current implementation)
// This generates PDF on-the-fly from your CV data

const generateCVHTML = (): string => {
  const experiencesHTML = experienceData
    .map(
      (exp) => `
    <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0;">
      <h3 style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 18px;">${exp.jobTitle}</h3>
      <p style="margin: 0 0 5px 0; color: #666; font-size: 14px; font-weight: 600;">${exp.company}</p>
      <p style="margin: 0 0 10px 0; color: #999; font-size: 12px;">${exp.dateRange}</p>
      <ul style="margin: 0; padding-left: 20px;">
        ${exp.responsibilities.map((resp) => `<li style="margin-bottom: 5px; color: #333; font-size: 14px; line-height: 1.6;">${resp}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('');

  const educationHTML = educationData
    .map(
      (edu) => `
    <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0;">
      <h3 style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 16px;">${edu.degree}</h3>
      <p style="margin: 0 0 5px 0; color: #666; font-size: 14px; font-weight: 600;">${edu.institution}</p>
      <p style="margin: 0; color: #999; font-size: 12px;">${edu.dateRange}</p>
    </div>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${profileData.fullName} - CV</title>
        <style>
          @media print {
            body { margin: 0; }
            .page-break { page-break-after: always; }
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #007AFF;
          }
          .header h1 {
            margin: 0 0 5px 0;
            color: #1a1a1a;
            font-size: 32px;
          }
          .header p {
            margin: 5px 0;
            color: #666;
            font-size: 16px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 24px;
            color: #007AFF;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #007AFF;
          }
          .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 10px;
          }
          .contact-info span {
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${profileData.fullName}</h1>
          <p>${profileData.jobTitle}</p>
          <div class="contact-info">
            <span>📧 ${profileData.email}</span>
            <span>📱 ${profileData.phone}</span>
            <span>📍 ${profileData.location}</span>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Profile</h2>
          <p style="color: #333; font-size: 15px; line-height: 1.8; text-align: justify;">
            ${profileData.summary}
          </p>
        </div>

        <div class="section">
          <h2 class="section-title">Experience</h2>
          ${experiencesHTML}
        </div>

        <div class="section">
          <h2 class="section-title">Education</h2>
          ${educationHTML}
        </div>
      </body>
    </html>
  `;
};

// Generate PDF dynamically (optimized for smaller file size)
export const exportToPDF = async (): Promise<void> => {
  try {
    const html = generateCVHTML();
    
    // Generate PDF - this will create the file without opening preview
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    // Small delay to ensure file is fully written
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!uri) {
      throw new Error('PDF generation failed - no file URI returned');
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share CV as PDF',
      });
    } else {
      Alert.alert('Error', 'Sharing is not available on this device');
    }
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    const errorMessage = error?.message || 'Unknown error occurred';
    Alert.alert('Error', `Failed to generate PDF: ${errorMessage}`);
  }
};

export const shareCV = async (): Promise<void> => {
  try {
    const html = generateCVHTML();
    
    // Generate PDF - this will create the file without opening preview
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    // Small delay to ensure file is fully written
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!uri) {
      throw new Error('PDF generation failed - no file URI returned');
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share CV',
      });
    } else {
      Alert.alert('Error', 'Sharing is not available on this device');
    }
  } catch (error: any) {
    console.error('Error sharing CV:', error);
    const errorMessage = error?.message || 'Unknown error occurred';
    Alert.alert('Error', `Failed to share CV: ${errorMessage}`);
  }
};

// Optional: Use pre-made PDF (uncomment and add PDF to assets/documents/cv.pdf)
// export const exportToPDF = async (): Promise<void> => {
//   try {
//     const asset = Asset.fromModule(require('../../assets/documents/cv.pdf'));
//     await asset.downloadAsync();
//     const pdfUri = asset.localUri || asset.uri;
//
//     if (await Sharing.isAvailableAsync()) {
//       await Sharing.shareAsync(pdfUri, {
//         mimeType: 'application/pdf',
//         dialogTitle: 'Share CV as PDF',
//       });
//     } else {
//       Alert.alert('Error', 'Sharing is not available on this device');
//     }
//   } catch (error) {
//     console.error('Error exporting PDF:', error);
//     Alert.alert('Error', 'Failed to export PDF. Please try again.');
//   }
// };
