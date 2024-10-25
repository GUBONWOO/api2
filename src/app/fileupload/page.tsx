'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

// 파일 입력을 위한 타입 정의
type FormValues = {
  file: FileList;
};

const FileUploadForm = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('File uploaded successfully!');
    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to upload file.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='file' {...register('file', { required: true })} />
      <button type='submit'>Upload</button>
    </form>
  );
};

export default FileUploadForm;
