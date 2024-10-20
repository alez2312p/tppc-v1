"use client";

import styles from "../styles/dashboard.module.css";
import contract from "../../../contract.json";
import { useReadContract } from 'wagmi';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Dashboard() {
  const [nftDataList, setNftDataList] = useState<any[]>([]); // Lista para varios NFTs
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Lista para URLs de las imágenes

  // Hook para leer el contrato de la posición 0
  const { data: data0, isLoading: isLoading0, error: error0 } = useReadContract({
    abi: contract.ABI,
    address: contract.ADDRESS as `0x${string}`,
    functionName: 'tokenURI',
    args: [0]
  });

  // Hook para leer el contrato de la posición 1
  const { data: data1, isLoading: isLoading1, error: error1 } = useReadContract({
    abi: contract.ABI,
    address: contract.ADDRESS as `0x${string}`,
    functionName: 'tokenURI',
    args: [1]
  });

  // useEffect para manejar la respuesta del NFT 0
  useEffect(() => {
    if (data0) {
      const ipfsUri = data0 as string;
      const url = ipfsUri.replace("ipfs://", "https://ipfs.io/ipfs/");

      fetch(url)
        .then(response => response.json())
        .then(jsonData => {
          setNftDataList(prev => [...prev, jsonData]);

          const imgUri = jsonData.image;
          const imgUrl = imgUri.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImageUrls(prev => [...prev, imgUrl]);
        })
        .catch(err => console.error('Error al obtener el JSON del NFT 0:', err));
    }
  }, [data0]);

  // useEffect para manejar la respuesta del NFT 1
  useEffect(() => {
    if (data1) {
      const ipfsUri = data1 as string;
      const url = ipfsUri.replace("ipfs://", "https://ipfs.io/ipfs/");

      fetch(url)
        .then(response => response.json())
        .then(jsonData => {
          setNftDataList(prev => [...prev, jsonData]);

          const imgUri = jsonData.image;
          const imgUrl = imgUri.replace("ipfs://", "https://ipfs.io/ipfs/");
          setImageUrls(prev => [...prev, imgUrl]);
        })
        .catch(err => console.error('Error al obtener el JSON del NFT 1:', err));
    }
  }, [data1]);

  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      <h1 style={{ fontSize: "2rem" }}>
        NFT
      </h1>
      <br />
      <div className={styles.container}>
        {isLoading0 || isLoading1 ? (
          <p>Cargando NFTs...</p>
        ) : (error0 || error1) ? (
          <p>Error al cargar los NFTs.</p>
        ) : (
          nftDataList.map((nftData, index) => (
            <div key={index} className={styles.nft_card}>
              {imageUrls[index] ? (
                <Image src={imageUrls[index]} alt={`NFT ${index}`} width={300} height={300} />
              ) : (
                <p>No se encontró la imagen del NFT.</p>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
