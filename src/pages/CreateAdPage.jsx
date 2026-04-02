import { useState } from 'react';
import { uploadAdPhoto } from '../api/adPhotosApi';

function CreateAdPage() {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (event) => {
    const [file] = event.target.files;
    if (!file) {
      return;
    }

    setUploading(true);
    try {
      await uploadAdPhoto(file);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section>
      <h2>Создание объявления</h2>
      <input type="file" onChange={handleFile} accept="image/*" />
      {uploading && <p>Фото загружается...</p>}
    </section>
  );
}

export default CreateAdPage;
