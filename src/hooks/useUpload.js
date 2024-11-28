import { useMemo } from "react";
import { Buffer } from "buffer";
import { create as ipfsHttpClient } from "ipfs-http-client";

export const useUpload = () => {
  const apiKey = process.env.REACT_APP_INFURA_API_KEY;
  const secret = process.env.REACT_APP_INFURA_API_SECRET;
  const subdomain = process.env.REACT_APP_INFURA_SUB_DOMAIN;

  const auth = `Basic ${Buffer.from(`${apiKey}:${secret}`).toString("base64")}`;
  const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (e) {
      console.log(e);
    }
  };

  const uploadToMultopleIPFS = async (files) => {
    console.log(files, "files");
    try {
      const urlArr = [];

      for (const file of files) {
        const added = await client.add({ content: file });
        const url = `${subdomain}/ipfs/${added.path}`;
        urlArr.push(url);
      }

      return urlArr;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteToIPFS = async (ipfsPath) => {
    try {
      console.log(`Unpinning file at ${ipfsPath}...`);

      await client.pin.rm(ipfsPath);

      console.log(`File at ${ipfsPath} successfully unpinned.`);

      return true;
    } catch (e) {
      console.error(`Error unpinning file at ${ipfsPath}:`, e);
      return false;
    }
  };

  const values = useMemo(
    () => ({
      uploadToIPFS,
      deleteToIPFS,
      uploadToMultopleIPFS,
    }),
    [uploadToIPFS, deleteToIPFS, uploadToMultopleIPFS]
  );

  return values;
};
