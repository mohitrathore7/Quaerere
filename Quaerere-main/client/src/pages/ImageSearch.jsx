import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';
import SearchImg from './SearchImage';

const ImageSearch = () => {
    const [imageData, setImageData] = useState(null);
    const loadFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUri = reader.result;
            setImageData(imageDataUri);
        };
        reader.readAsDataURL(file);
    };

    const [loading, setLoading] = useState(false);
    const [ocrResult, setOcrResult] = useState('');

    const get_data = async (worker) => {
        setLoading(true);
        const { data: { text } } = await worker.recognize(imageData);
        console.log(text);
        setLoading(false);
        setOcrResult(text);
        await worker.terminate();
    };

    const func_worker = async () => {
        const worker = await createWorker('eng', 1, {
            logger: (m) => console.log(m), // Add logger here
        });
        get_data(worker);
    };

    return (
        <>
            <div className="flex flex-col overflow-x-hidden md:flex-row justify-center p-4 md:p-10">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <div className="border border-gray-300 p-4">
                        <label className="block text-xl mb-4">Drag image here or click to select file</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => loadFile(e.target.files[0])}
                            multiple={false}
                        />
                        {!!imageData && (
                            <img src={imageData} alt="Selected" className="w-full border border-gray-300" />
                        )}
                    </div>
                </div>

                <div className="w-full md:w-1/2 pl-0 md:pl-4">
                    <div className='flex justify-center gap-x-7'>
                        <button
                            disabled={!imageData}
                            onClick={() => func_worker()}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2"
                        >
                            Extract
                        </button>
                    </div>
                    <p className="text-xl text-center md:text-left">{loading ? "Loading ...." : "Result"}</p>
                    <div className="relative pt-1">
                        <div className="flex mb-2">
                            <div className="flex-grow pt-1">
                                <div className="relative w-full bg-gray-200 rounded-full">
                                    <div className="flex h-2 bg-blue-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="font-mono bg-gray-700 text-white p-4">{ocrResult}</p>
                    </div>
                </div>
            </div>
            <SearchImg keywords={ocrResult} type={"keyword"}/>
        </>
    );
};

export default ImageSearch;
