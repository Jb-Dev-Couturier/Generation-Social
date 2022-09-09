import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt, FaFileUpload } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState('');
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [imageAsset, setImageAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const fileTypesV = ['video/mp4', 'video/webm', 'video/ogg'];
  const fileTypesI = [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/wbep',
    ];
    
    const uploadFile = async (e: any) => {
      const selectedFile = e.target.files[0];

      if (fileTypesV.includes(selectedFile.type)) {
        setWrongFileType(false);
         setIsLoading(true);
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
          setWrongFileType(false);
        });
    } 
    if (fileTypesI.includes(selectedFile.type)) {
        setWrongFileType(false);
        setIsLoading(true);
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setImageAsset(data);
          setIsLoading(false);
          setWrongFileType(false);
          
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };
  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-zinc-800 rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold text-[#00af12]"># PARTAGER</p>
            <p className="text-md text-[#fff] mt-1">
              Poster une Image ou une Video Sur votre profil
            </p>
          </div>
          <div className="border-dashed rounded-xl border border-[#fff] flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] cursor-pointer hover:border-[#00af12] hover:bg-zinc-700">
            {isLoading ? (
              <p>Chargement...</p>
            ) : (
              <div>
                {videoAsset || imageAsset ? (
                  <div className="overflow-hidden">
                    {!videoAsset ? (
                      <img
                        className="h-[auto] rounded-2xl bg-zinc-800 object-cover "
                        src={imageAsset ? imageAsset.url : ''}
                        alt="marche pas"
                      />
                    ) : (
                      <video
                        src={videoAsset ? videoAsset.url : ''}
                        loop
                        controls
                        className="rounded-xl h-[450px] mt-16 bg-zinc-800"
                      ></video>
                    )}
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold text-gray-500">
                          Partager un fichier
                        </p>
                      </div>
                      <p className="text-gray-600 text-center mt-10 text-sm leading-10">
                        MP4 ou WeBM ou jpeg ou png <br />
                        720x1280 ou plus <br />
                        Max 10min <br />
                        Moins de 2GB
                      </p>
                      <p className="flex justify-center items-center bg-[#00af12] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none hover:scale-95">
                        Choisir Votre Fichier <FaFileUpload className="ml-2" />
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload"
                      onChange={uploadFile}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-sm text-red-400 font-semibold mt-4 w-[250px]">
                Selectionner un fichier Valide !
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium text-gray-400">Légende</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2"
          />
           <label className='text-md font-medium '>Choose a topic</label>

          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className='outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
          ></select>
        </div>
      </div>
    </div>
  );
};

export default Upload;
