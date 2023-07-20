import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { Web3Storage } from 'web3.storage';

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUzOENiMUZlOTVFN0RCZjUzZjFDNDM1YWUwMkFBMjgzRTY1NzZBQjEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODIxOTU2NTA2MDksIm5hbWUiOiJTb2JlckhhdmVuIn0.pM-sWqhkVK1SlTfj-GP7z4NoRIxpicS1HCoVdAo8fPs";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

const Manufacturetest = () => {

  const [flag, setFlag] = useState(false);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [final, setFinal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [selectedFile, setSelectedFile] = useState();


  const navigate = useNavigate();

  const { publishPost } = useStateContext();
  const [form, setForm] = useState({
    ID: "",
    LOCATION: "",
  });





  //  // const [isLoading, setIsLoading] = useState(false);
  //   async function storeFiles(files) {
  //     const client = makeStorageClient();
  //    // setIsLoading(true);
  //     const cid = await client.put(files)
  //   //  setIsLoading(false);
  //     console.log('stored files with cid:', cid)
  //     setLink(cid);

  //     //console.log(link);
  //     setFlag(true);
  //     return cid
  //   }

  // const [file, setFile] = useState()
  // function getFiles () {
  //   const fileInput = document.querySelector('input[type="file"]')
  //   var newString = fileInput.files[0].name.replace(/ /g, "%20");

  //   console.log(fileInput.files[0])
  //   //console.log(link)
  //   setFinal(`https://${link}.ipfs.w3s.link/${newString}`)   
  //   console.log(final)
  //   return fileInput.files

  //}



  // new
  const handleImage = async (e) => {
    // Files

    if (e.target.files) {
      setIsLoadingImg(true);

      const fileInput = document.querySelector('input[type="file"]');
      var newString = fileInput.files[0].name.replace(/ /g, "%20");

      let g = e.target.files;
      let f = e.target.files[0].name;

      setSelectedFile(e.target.files[0]);
      const client = makeStorageClient();
      const cid = await client.put(fileInput.files);
      console.log('stored files with cid:', cid);
      console.log(e.target.files[0].name);
      console.log(`https://${cid}.ipfs.w3s.link/${newString}`);
      setFinal(`https://${cid}.ipfs.w3s.link/${newString}`);
      setIsLoadingImg(false);

    }
  };



  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //console.log( form)
    console.log(final);
    form.image = final;
    console.log(form);
    console.log(link);
    setIsLoading(true);
    await publishPost({
      ...form,

    });
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="bg-blue-50 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-sky-600 rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          TRANSPORTER DETAILS
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="ID Of Transporter*"
            placeholder="Enter Your ID"
            inputType="text"
            value={form.ID}
            handleChange={(e) => handleFormFieldChange("ID", e)}
          />

          {/* <FormField
            labelName="Post owner"
            placeholder="wallet address "
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          /> */}
        </div>

        <FormField
          labelName="Location*"
          placeholder="Enter The Location"
          inputType="text"
          value={form.LOCATION}
          handleChange={(e) => handleFormFieldChange("LOCATION", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="SUBMIT DETAILS"
            styles="bg-sky-600"
          />
        </div>
      </form>
    </div>
  );
};

export default Manufacturetest;
