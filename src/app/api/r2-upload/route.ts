import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: NextRequest, response: NextResponse) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await S3.send(
    new PutObjectCommand({
      Body: buffer,
      Bucket: process.env.BUCKET_NAME || '',
      Key: `trials/${file.name}`, // アップロード先のパス
      ContentType: file.type,
    })
  );

  return NextResponse.json({ success: true });
}
