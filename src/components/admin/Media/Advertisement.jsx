import React, { useState } from 'react';
import { addAdvertisement } from '../../../Api/AdminAPI';
import { BiArrowBack } from 'react-icons/bi';
import toast from 'react-hot-toast';

function AddAdvertisement({ close }) {
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleBack = () => {
        close()
    }
    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        setImage(image);
        setPreviewImage(URL.createObjectURL(image))
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            if (image) {
                formData.append('image', image);
            }

            await addAdvertisement(formData);
            toast.success('Upload successful');
            close()
        } catch (error) {
            console.error('Error uploading:', error);
        }
    };

    return (
        <div>
            <div className="center bg-white max-w-[400px] sm:w-1/2 z-50">
                <div className="flex justify-between ">
                    <button onClick={handleBack} className="top-0 relative left-5">
                        <BiArrowBack size={20} />
                    </button>
                    <h1 className="text-2xl text-center">Add Advertisement</h1>
                    <div></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="profile">
                        <img src={previewImage} className="profile_img" alt="advertisment" />
                    </div>

                    <div className="txt_field">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className='mt-3'
                            onChange={handleImageUpload}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm mb-5 py-2.5 text-center "
                    >
                        ADD Advertisment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddAdvertisement;
