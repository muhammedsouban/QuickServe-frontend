import React, { useEffect, useState } from 'react';
import AddAdvertisement from './Advertisement';
import AddBanner from './Banner';
import MediaCard from './MediaCards';
import { deleteAdvertisement, deleteBanner, deleteMediaCards, getMedia } from '../../../Api/AdminAPI';
import EditAdvt from './EditMedia/Advt';
import EditBanner from './EditMedia/banner';
import EditMediaCard from './EditMedia/Cards';
import BASE_URL from '../../../config/config';

function Media() {
    const [cardModel, setCardModel] = useState(false);
    const [AddModel, setAddModel] = useState(false);
    const [BannerModel, setBannerModel] = useState(false);
    const [editcardModel, setEditCardModel] = useState(false);
    const [editModel, setEditModel] = useState(false);
    const [editBannerModel, setEditBannerModel] = useState(false);
    const [media, setMedia] = useState([])
    const [id, setId] = useState()

    const handlecardModel = () => {
        setCardModel(!cardModel);
    };

    const handleAddModel = () => {
        setAddModel(!AddModel);
    };

    const handleBannerModel = () => {
        setBannerModel(!BannerModel);

    };
    const handleEditcardModel = (id) => {
        setEditCardModel(!editcardModel);
        setId(id)
    };

    const handleEditModel = (id) => {
        setEditModel(!editModel);
        setId(id)
    };

    const handleEditBannerModel = (id) => {
        setEditBannerModel(!editBannerModel);
        setId(id)
    };

    const deleteCard = (id) => {
        deleteMediaCards(id)
            .then(() => {
                getMedia().then((res) => {
                    setMedia(res.data);
                });
            })
            .catch((error) => {
                console.error('Error deleting media card:', error);
            });
    };
    
    const deletebanner = (id) => {
        deleteBanner(id)
            .then(() => {
                getMedia().then((res) => {
                    setMedia(res.data);
                });
            })
            .catch((error) => {
                console.error('Error deleting banner:', error);
            });
    };

    const deleteAdd = (id) => {
        deleteAdvertisement(id)
            .then(() => {
                getMedia().then((res) => {
                    setMedia(res.data);
                });
            })
            .catch((error) => {
                console.error('Error deleting advertisement:', error);
            });
    };

    useEffect(() => {
        getMedia().then((res) => {
            setMedia(res.data)
        })
    }, [BannerModel, AddModel, cardModel,editcardModel,editBannerModel,editModel])

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 mt-2">
                <div className="w-3/5 text-2xl font-semibold py-5">Media Management</div>

                <div className="w-3/5 bg-white py-2 px-4 flex justify-between items-center">
                    <h2 className=' text-lg font-semibold'>Cards</h2>
                    <button className="bg-green-500 p-2 rounded-md text-white" onClick={handlecardModel}>
                        Add Media Card
                    </button>
                </div>

                {media.Cards && media.Cards.map((item) => (
                    <div className="w-3/5 rounded overflow-hidden shadow-lg bg-white" key={item._id}>
                        <div className="px-6 py-4">
                            <h2 className="text-xl text-center border-b-2 py-2 border-gray-300 font-bold mb-2">{item.title}</h2>
                            <div className="flex justify-center">
                                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
                                    {item.images.map((image) => (<div key={image._id} className="w-full">
                                        <img
                                            className="object-contain"
                                            src={`${BASE_URL}/public/images/${image.image}`}
                                            alt="Image 1"
                                        />
                                    </div>))}

                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3 mx-2 mb-2'>
                            <button onClick={(() => handleEditcardModel(item._id))} className="w-full text-white font-bold bg-green-600 py-2 px-4 rounded">
                                Edit
                            </button>
                            <button onClick={(() => deleteCard(item._id))} className="w-full text-white font-bold bg-red-600 py-2 px-4 rounded">
                                Delete
                            </button>

                        </div>
                    </div>
                ))}

                <div className="w-3/5 bg-white py-2 px-4 flex justify-between items-center">
                    <h2 className=' text-lg font-semibold'>Advertisement</h2>
                    <button className="bg-green-500 p-2 rounded-md text-white" onClick={handleAddModel}>
                        Add Advertisement
                    </button>
                </div>
                <div className="w-3/5 rounded overflow-hidden bg-white shadow-lg">
                    <div className=" px-6 py-4">
                        {media.Cards && media.Adds.map((item) => (<div key={item._id} className="flex  justify-center items-center py-5">
                            <div className="h-32 flex">
                                <img
                                    className="object-contain"
                                    src={`${BASE_URL}/public/images/${item.image}`}
                                    alt="Image 1"
                                />
                            </div>
                            <div className=" px-2 mx-2 my-2">
                                <button onClick={(() => handleEditModel(item._id))} className="bg-green-500 mb-3 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                                <button onClick={(() => deleteAdd(item._id))} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>))}
                    </div>
                </div>
                <div className="w-3/5 bg-white py-2 px-4 flex justify-between items-center">
                    <h2 className=' text-lg font-semibold'>Banner</h2>
                    <button className="bg-green-500 p-2 rounded-md text-white" onClick={handleBannerModel}>
                        Add Banner
                    </button>
                </div>
                <div className="w-3/5 rounded overflow-hidden shadow-lg bg-white">
                    <div className=" px-6 py-4">
                        {media.banner && media.banner.map((item) => (<div key={item._id} className="flex justify-center items-center mb-5">
                            <div className="w-full">
                                <img
                                    className="w-full h-auto"
                                    src={`${BASE_URL}/public/images/${item.image}`}

                                    alt="Image 1"
                                />
                            </div>
                            <div className=" px-2  mx-2 my-2">
                                <button onClick={(() => handleEditBannerModel(item._id))} className="w-full bg-green-500 mb-3 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                                <button onClick={(() => deletebanner(item._id))} className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
            {cardModel && (
                <div className="modal-overlay">
                    <MediaCard
                        onClose={handlecardModel}
                    />
                </div>
            )}
            {AddModel && (
                <div className="modal-overlay">
                    <AddAdvertisement
                        close={handleAddModel}
                    />
                </div>
            )}
            {BannerModel && (
                <div className="modal-overlay">
                    <AddBanner
                        close={handleBannerModel}
                    />
                </div>
            )}
            {editcardModel && (
                <div className="modal-overlay">
                    <EditMediaCard
                        onClose={handleEditcardModel}
                        Id={id}

                    />
                </div>
            )}
            {editModel && (
                <div className="modal-overlay">
                    <EditAdvt
                        close={handleEditModel}
                        Id={id}

                    />
                </div>
            )}
            {editBannerModel && (
                <div className="modal-overlay">
                    <EditBanner
                        close={handleEditBannerModel}
                        Id={id}
                    />
                </div>
            )}
        </>
    );
}

export default Media;
