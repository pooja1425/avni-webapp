import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import ScreenWithAppBar from "../common/components/ScreenWithAppBar";

export const Translations = props => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onChangeHandler = e => {
    setSelectedFile(e.target.files[0]);
  };

  const onUploadHandler = event => {
    const data = new FormData();
    data.append("translationFile", selectedFile);
    axios
      .post("/translation", data)
      .then(res => {
        if (res.status === 200) {
          alert("upload successful");
        }
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data);
        } else {
          alert("Something went wrong while uploading this file");
        }
      });
    setSelectedFile(null);
  };

  const divStyle = {
    display: "flex",
    alignItems: "center"
  };

  const onDownloadHandler = event => {
    return axios({
      url: "/translation",
      method: "GET",
      responseType: "blob"
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "translations.json");
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong while downloading this file");
        }
      });
  };

  return (
    <ScreenWithAppBar appbarTitle={`Translations`}>
      <p>Upload Translation File</p>
      <div style={divStyle}>
        <input type="file" onChange={onChangeHandler} />
        <Button onClick={onUploadHandler}>Upload</Button>
      </div>
      <p />
      <p>Download Translation File</p>
      <Button onClick={onDownloadHandler}>Download</Button>
    </ScreenWithAppBar>
  );
};
