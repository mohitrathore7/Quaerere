import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import SearchImg from './SearchImage';

const ImageRecognition = () => {
  const [imageURL, setImageURL] = useState('');
  const [prediction, setPrediction] = useState('');
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Load the MobileNet model when the component mounts
    async function loadModel() {
      const net = await mobilenet.load();
      setModel(net);
    }

    loadModel();
  }, []);

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const classifyImage = async () => {
    if (!model) {
      console.error('Model not loaded yet.');
      return;
    }

    const imageElement = document.createElement('img');
    imageElement.src = imageURL;
    await imageElement.decode();

    const imageTensor = tf.browser.fromPixels(imageElement);
    const predictions = await model.classify(imageTensor);
    setPrediction(predictions[0].className);
    console.log(prediction)
  };

  return (
    <div className=" min-h-screen p-4">
      <div className="lg:flex lg:justify-start">
        <div className=" border-2 border-black w-[100%] p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block mb-2">Enter Image URL:</label>
            <input
              type="text"
              value={imageURL}
              onChange={handleImageURLChange}
              placeholder="Image URL"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <button
              onClick={classifyImage}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Classify Image
            </button>
          </div>
          {imageURL && (
            <div className="mb-4">
              <img src={imageURL} alt="Image" className="w-16 h-16 rounded-lg" />
            </div>
          )}
          {prediction && (
            <div>
              <p className="text-lg font-semibold">
                <strong>Prediction:</strong> {prediction}
              </p>
            </div>
          )}
        </div>
      </div>
      <SearchImg keywords={prediction} type={"keyword"}/>
    </div>
  );
};

export default ImageRecognition;
