import express, { Request, Response } from 'express';
import multer from 'multer';

const app = express();
const PORT = 3000;

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 파일이 저장될 위치
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 원래 파일 이름으로 저장
  },
});

const upload = multer({ storage });

// 파일 업로드 API
app.post(
  '/api/upload',
  upload.single('file'),
  async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).send('파일이 없습니다.');
      return; // 여기서 명시적으로 반환
    }

    // 업로드된 파일 정보를 사용하여 MySQL에 저장하는 로직 추가
    // 예: await prisma.file.create({ data: { filename: req.file.filename } });

    res.status(200).send('파일 업로드 성공'); // 성공 메시지 반환
  }
);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
