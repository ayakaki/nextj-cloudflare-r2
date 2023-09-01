'use client';

export const ViewFileButton = () => {
  const fileName = 'cloudflare-trial';

  const downloadFile = async () => {
    const res = await fetch(`/api/r2-download?doc=${fileName}`, {
      method: 'GET',
    });
    const blob = await res.blob();
    const fileUrl = URL.createObjectURL(blob);
    window.open(fileUrl);
  };

  return (
    <div onClick={downloadFile} className="mt-12">
      <button className="px-4  bg-gray-100 rounded border-2 border-gray-500">
        R2からファイルを取得
      </button>
    </div>
  );
};
