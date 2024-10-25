import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// POST 메서드에 대한 named export
export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();

  try {
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // 해시화된 비밀번호 저장
        role: role || 'USER',
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '사용자 추가에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// GET 메서드에 대한 named export
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  // name이 null이 아닌 경우에만 Prisma 쿼리를 수행
  if (!name) {
    return NextResponse.json(
      { error: '이름을 제공해야 합니다.' },
      { status: 400 }
    );
  }

  console.log(`Searching for user with name: ${name}`);

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name, // 이름에 해당 문자열을 포함하는 사용자 검색
        },
      },
    });

    // 검색된 사용자가 있는지 확인
    if (users.length > 0) {
      console.log(`Found users: ${JSON.stringify(users)}`);
      return NextResponse.json(users, { status: 200 });
    } else {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 데 실패했습니다.' },
      { status: 500 }
    );
  }
}
