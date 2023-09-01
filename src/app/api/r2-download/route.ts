import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function GET(request: NextRequest, response: NextResponse) {
  // パラメータから取得する資料名を取得する
  const url = new URL(request.url);
  const params = url.searchParams;
  const docTitle = params.get('doc');

  try {
    const pdf = await S3.send(
      new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `trials/${docTitle}.pdf`,
      })
    );

    if (!pdf) {
      throw new Error('pdf not found.');
    }

    return new Response(pdf.Body?.transformToWebStream(), {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (err) {
    console.log('error', err);
  }
}
