import * as React from 'react';
import { MintContext } from '../contexts/MintContext';

export default function SelectedImage({
  img,
  pickOtherImage,
}: {
  img: string;
  pickOtherImage: any;
}) {
  const { setName, setDescription, setExternalUrl, mintNft } =
    React.useContext(MintContext);

  function createNft() {
    mintNft(img);
  }
  return (
    <div className="w-screen flex justify-center flex-col items-center">
      <div className="w-[500px] flex justify-center flex-col items-center">
        <div className="btn btn-primary mt-3" onClick={pickOtherImage}>
          Trocar Imagem
        </div>
        <img
          className="w-[500px] h-[500px] object-cover rounded-md"
          src={img}
          alt="selected image"
        />
        <input
          type="text"
          placeholder="Titulo"
          required
          className="input input-bordered w-full mt-6"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          className="textarea textarea-bordered w-full mt-6"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL externa"
          className="input input-bordered w-full  mt-6"
          onChange={(e) => setExternalUrl(e.target.value)}
        />
        <div className="btn btn-primary w-full mt-3" onClick={createNft}>
          Criar NFT
        </div>
      </div>
    </div>
  );
}
