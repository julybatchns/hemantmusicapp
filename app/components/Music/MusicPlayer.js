import useUser from '@/app/customHook/useUser';
import React, { useContext } from 'react';
import styles from "./MusicPlayer.module.css";
import { UserContext } from '@/app/Provider/UserProvider';
import like from "../../assets/icon/heartLike.svg";
import noLike from "../../assets/icon/heartNotLike.svg";
import Image from 'next/image';

function MusicPlayer(props) {
  const {title, _id, audio_url, thumbnail, isFav} = props;
    const { getToken } = useContext(UserContext);


    async function markFavAndUnFavorite(){
      const url = "https://academics.newtonschool.co/api/v1/music/favorites/like";
      const myHeaders = new Headers();
      myHeaders.append("projectID", "69wrdjpfsdpk");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const raw = JSON.stringify({
        "songId": _id
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data, "markFavAndUnFavorite Data");
        
    }



  return (
    <>
        <div className={styles.musicPlayer} key={_id}>
            <img className={styles.image} src={thumbnail} alt={"thumbnail"} />

            <div className={styles.music_title}>{title}</div>

            <audio controls src={audio_url}></audio>

            {
              getToken &&  (
                isFav ? (<p style={{cursor: "pointer"}} onClick={() => {
                  // MAKING FAV
                  markFavAndUnFavorite();
                }}><Image height={25} width={25} src={noLike} alt='NotLike' /></p>
                ) : (
                  <p style={{cursor: "pointer"}} onClick={() => {
                  // MAKING UN FAV
                  markFavAndUnFavorite();
                }}><Image height={25} width={25} src={like} alt='like' /></p>)
              )
            }
        </div>
    </>
  )
}

export default MusicPlayer;
