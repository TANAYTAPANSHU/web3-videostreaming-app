import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import { create } from "ipfs-http-client";
import saveToIPFS from "../../utils/saveToIPFS";
import { useCreateAsset } from "@livepeer/react";

export default function UploadVideo() {
  // Creating state for the input field
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    location:"",
    thumbnail: "",
    video: ""
  })


  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();

  const handleSubmit = async () => {
    // Calling the upload video function
    await uploadVideo();
    // Calling the upload thumbnail function and getting the CID
    const thumbnailCID = await uploadThumbnail();
    // Creating a object to store the metadata
    let data = {
      video: asset?.id,
      title,
      description,
      location,
      category,
      thumbnail: thumbnailCID,
      UploadedDate: Date.now(),
    };
    // Calling the saveVideo function and passing the metadata object
    await saveVideo(data);
  };

  const uploadThumbnail = async () => {
    // Passing the file to the saveToIPFS function and getting the CID
    const cid = await saveToIPFS(thumbnail);
    // Returning the CID
    return cid;
  };

  const uploadVideo = async () => {
    // Calling the createAsset function from the useCreateAsset hook to upload the video
    createAsset({
      name: videoDetails.title,
      file: videoDetails.video,
    });
  };

  const saveVideo = async (data) => {
    // Get the contract from the getContract function
    let contract = await getContract();

    // Upload the video to the contract
    await contract.uploadVideo(
      data.video,
      data.title,
      data.description,
      data.location,
      data.category,
      data.thumbnail,
      false,
      data.UploadedDate
    );
  };


  function discard() {

  }

  const {
    mutate: createAsset,
    data: asset,
    uploadProgress,
    status,
    error,
  } = useCreateAsset();

  

  return (
    <div className="w-full  h-screen flex flex-row  bg-[#1a1c1f]" >
      <div className="flex-1 flex flex-col">
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6">
              Discard
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
            >
              <BiCloud />
              <p className="ml-2">Upload</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={videoDetails.title}
              onChange={(e) => setVideoDetails({...videoDetails,title:e.target.value})}
              placeholder="Illahi - Yeh Jawani hai Diwani"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={videoDetails.description}
              onChange={(e) => setVideoDetails({...videoDetails,description:e.target.value})}
              placeholder="Visiting new places, meeting new people & capturing all that's around is what Bunny wants. Watch him as he travels the world, see it through his camera & live his dream in ILLAHI."
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={videoDetails.location}
                  onChange={(e) => setVideoDetails({...videoDetails,location:e.target.value})}
                  type="text"
                  placeholder="Bengaluru - India"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={videoDetails.category}
                  onChange={(e) =>   setVideoDetails({...videoDetails,category:e.target.value})}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                </select>
              </div>
            </div>
            <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

            <div
              onClick={() => {
                thumbnailRef.current.click();
              }}
              className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
            >
              {videoDetails.thumbnail ? (
                <img
                  src={URL.createObjectURL(videoDetails.thumbnail)}
                  alt="thumbnail"
                  className="h-full rounded-md"
                />
              ) : (
                <BiPlus size={40} color="gray" />
              )}
            </div>

            <input
              type="file"
              className="hidden"
              ref={thumbnailRef}
              onChange={(e) => {
                setVideoDetails({...videoDetails,thumbnail:e.target.files[0]})
              }}
            />
          </div>

          <div
            onClick={() => {
              videoRef.current.click();
            }}
            className={
                videoDetails.video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
            }
          >
            {videoDetails.video ? (
              <video
                controls
                src={URL.createObjectURL(videoDetails.video)}
                className="h-full rounded-md"
              />
            ) : (
              <p className="text-[#9CA3AF]">Upload Video</p>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={"video/*"}
          onChange={(e) => {
            setVideoDetails({...videoDetails,video:e.target.files[0]})
            console.log(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
}
