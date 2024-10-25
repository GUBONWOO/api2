import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File; // Blob 대신 File로 변경

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 저장 경로 설정
    const filePath = path.join(process.cwd(), 'uploads', file.name);

    // 파일 저장
    await fs.writeFile(filePath, buffer);

    // 데이터베이스에 파일 정보 저장
    const savedFile = await prisma.file.create({
      data: {
        filename: file.name,
        filepath: filePath, // 파일 경로 저장
      },
    });

    return NextResponse.json(
      { message: 'File uploaded successfully', file: savedFile },
      { status: 200 }
    );
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
