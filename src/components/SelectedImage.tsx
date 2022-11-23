import * as React from 'react';

export default function SelectedImage({
  img,
  pickOtherImage,
}: {
  img: string;
  pickOtherImage: any;
}) {
  return (
    <div className="w-screen flex justify-center flex-col items-center">
      <img
        className="w-[500px] h-[500px] object-cover rounded-md"
        src={img}
        alt="selected image"
      />
      <div className="btn btn-primary mt-3" onClick={pickOtherImage}>
        Trocar Imagem
      </div>
      <div className="btn btn-primary mt-3">Mint</div>
    </div>
  );
}
