import React, { useState } from 'react';
import axios from 'axios';
import { addMediaCards } from '../../../Api/AdminAPI';
import toast from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';


function MediaCard({onClose}) {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState(['', '', '', '']);

    const handleBack = () => { onClose() }
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = file;
            return updatedImages;
        });
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);

            images.forEach((image) => {
                if (image) {
                    formData.append('images', image);
                }
            });

            await addMediaCards(formData);
            toast.success('Upload successful');
            onClose()
        } catch (error) {
            console.error('Error uploading:', error);
        }
    };

    return (
        <div>
            <div className="flex flex-col mx-auto max-w-screen-lg mt-10 bg-[#E8F5FF] shadow-lg">
                <div className="flex justify-between items-center mb-4 px-6 md:px-0 ">
                    <button className="top-0 relative left-5">
                        <BiArrowBack onClick={handleBack} size={20} />
                    </button>
                    <div className=" text-center w-full">
                        <p className="py-1.5 pl-5 text-lg font-semibold text-blue-900">Add Media Card</p>
                    </div>
                </div>
                <div className=" rounded-lg p-6 overflow-y-auto max-h-[600px]">
                    <span className='mx-2'>Enter Title Name</span>
                    <input type="text" className="p-2 mb-3 w-80 bg-gray-100" value={title} onChange={handleTitleChange} placeholder="Enter title" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                        {images.map((image, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-60 h-40 bg-gray-500 rounded-lg mb-5">
                                    {image && (
                                        <img
                                            className="w-full h-full object-cover rounded-lg"
                                            src={URL.createObjectURL(image)}
                                            alt=""
                                        />
                                    )}
                                </div>

                                <label htmlFor={`ima-${index}`} className="w-44 py-2 bg-gray-200 text-center cursor-pointer">
                                    {image ? 'Change Image' : 'Select Image'}
                                </label>
                                <input type="file" name={`ima-${index}`} id={`ima-${index}`} onChange={(e) => handleImageUpload(e, index)} style={{ display: 'none' }} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button className="px-4 py-2 w-full bg-blue-900 text-white rounded-lg" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MediaCard;
