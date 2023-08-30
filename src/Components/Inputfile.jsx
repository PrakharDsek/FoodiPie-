import { useState } from "react";
import styled from "styled-components";

const Inputfile = ({ handlers }) => {
  const [selectedImg, setSelectedImg] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setSelectedImg(fileArray);
    handlers(fileArray); // Pass the array of selected images to the handlers function
    console.log(fileArray)
  };

  return (
    <Container>
      <label htmlFor="images" className="drop-container">
        <span className="drop-title">Drop files here</span> or
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple={true}
          required
          onChange={handleFileChange} // Call handleFileChange function when the file input changes
        />
      </label>
    </Container>
  );
};

export default Inputfile;

const Container = styled.div`
  body {
    margin: 20px 60px;
  }

  .drop-container {
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    padding: 20px;
    border-radius: 10px;
    border: 2px dashed #555;
    color: #444;
    cursor: pointer;
    transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
  }

  .drop-container:hover {
    background: #eee;
    border-color: #111;
  }

  .drop-container:hover .drop-title {
    color: #222;
  }

  .drop-title {
    color: #444;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color 0.2s ease-in-out;
  }

  input[type="file"] {
    width: 350px;
    max-width: 100%;
    color: #444;
    padding: 5px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #555;
  }

  input[type="file"]::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  input[type="file"]::file-selector-button:hover {
    background: #0d45a5;
  }
`;
