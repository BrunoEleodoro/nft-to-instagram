import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import * as React from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import NftMinter from '../shared/abi/contracts/NftMinter.sol/NftMinter.json';

export const MintContext = React.createContext<any>({});

export type nftMetadata = {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes?: [
    {
      trait_type: '';
      value: '';
    }
  ];
};

export default function MintCtxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [externalUrl, setExternalUrl] = React.useState('');
  const [tokenURI, setTokenURI] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const storage = getStorage();

  const { config } = usePrepareContractWrite({
    address: '0x19F34049af1D3D2D044c5c80AbfdcC5421A54553',
    abi: NftMinter.abi,
    functionName: 'mint',
    args: [tokenURI],
  });
  const { isSuccess, write } = useContractWrite(config as any);

  async function mintNft(image: string) {
    setIsLoading(true);
    const timestamp = Date.now().toString();
    const imageRef = ref(
      storage,
      '/nft-to-instagram/images/' + timestamp + '.jpg'
    );
    const payloadRef = ref(storage, '/nft-to-instagram/' + timestamp);
    const res = await uploadString(imageRef, image, 'data_url');
    const downloadURL = await getDownloadURL(res.ref);
    const payload: nftMetadata = {
      name,
      description,
      image: downloadURL,
      external_url: externalUrl,
    };
    const resURI = await uploadString(payloadRef, JSON.stringify(payload));
    const downloadURLURI = await getDownloadURL(resURI.ref);
    write?.({ recklesslySetUnpreparedArgs: [downloadURLURI] });
    setTokenURI(downloadURLURI);
    // write!();
    setIsLoading(false);
  }
  return (
    <MintContext.Provider
      value={{
        isLoading,
        mintNft,
        setName,
        isSuccess,
        setDescription,
        setExternalUrl,
      }}
    >
      {children}
    </MintContext.Provider>
  );
}
