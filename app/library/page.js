"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useUser from '../customHook/useUser';
import styles from "./library.module.css";



function library() {
  const {getToken} = useUser();
  const router = useRouter();

  useEffect(() => {
    if(!getToken){
        router.push("/login");
    }
  }, []);

  const [favSongList, setFavSongList] = useState([]);
  console.log(favSongList, "favSongList");
  

  useEffect(() => {
    async function getListOfFavoSong(){
      const url = "https://academics.newtonschool.co/api/v1/music/favorites/like";

      const myHeaders = new Headers();
      myHeaders.append("projectID", "69wrdjpfsdpk");
      myHeaders.append("Authorization", `Bearer ${getToken}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const songs = data?.data?.songs;

      setFavSongList(songs);
    
    }

      getListOfFavoSong();
  }, []);


  return (
    <>
      <div className={styles.library}>
        <h1> Your Library</h1>
        <div className={styles.mainSection}>
          {favSongList?.map((favSong) => {
            const { _id, title, audio_url, thumbnail, artist} = favSong;

            return(
              <>
                <div key={_id} className={styles.cardContainer}>
                  <div>
                    <div className={styles.images}>
                      <img className={styles.image} src={thumbnail} alt={"thumbnail"} />
                    </div>
                    <div className={styles.detailes}>
                      <h4>{title}</h4>
                      <p style={{color: '#a8a3a3'}}>{artist.name}</p>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default library;
