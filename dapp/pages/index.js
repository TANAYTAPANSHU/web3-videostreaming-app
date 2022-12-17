import React, { useEffect } from "react";
import LandingPage from "./landingpage";
import Video from "./video";

const wallet = null;




let videos = [{
  horizontal: false, 
  video : {
    title: "Ferrai: for you",
    author:"Tanay",
    category: "music"
  } ,
  urls : "https://ipfs.filebase.io/ipfs/Qmdp4CT3FzJKhzc2XoukMFRvEArzKBUEYVsayTPnn1xgwV" 
},
{
  horizontal: false, 
  video : {
    title: "Newyork city",
    author:"Lost wandere",
    category: "music"
  } ,
  urls : "https://ipfs.filebase.io/ipfs/QmQNPq9RB5LKMGJKyJgogk8hi9Xg8KMJcsY4uU51BQiVYp" 
},

{
  horizontal: false, 
  video : {
    title: "Chainsmokers: Closer",
    author:"Chainsmokers",
    category: "music"
  } ,
  urls : "https://ipfs.filebase.io/ipfs/Qmdp4CT3FzJKhzc2XoukMFRvEArzKBUEYVsayTPnn1xgwV" 
},

{
  horizontal: false, 
  video : {
    title: "Chainsmokers: Closer",
    author:"Chainsmokers",
    category: "music"
  } ,
  urls : "https://ipfs.filebase.io/ipfs/QmQNPq9RB5LKMGJKyJgogk8hi9Xg8KMJcsY4uU51BQiVYp" 
}

]

export default function index() {
  return (
    <>
{!wallet ?  <LandingPage /> : 
<div className="w-full  h-screen flex flex-row  bg-[#1a1c1f]">
{videos.map((video) => (
        <div
            className="w-80"
            onClick={() => {
                // Navigation to the video screen (which we will create later)
                window.location.href = `/video?id=${video.id}`;
       }}
            >
                <Video video={video} />
        </div>
))}

</div> 

}
</>
  );
 
}