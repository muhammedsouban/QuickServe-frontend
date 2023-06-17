import React from 'react'
import { deleteService } from '../../Api/AdminAPI';

function Deleteservice({open,serviceId}) {

    const close = () => {
        open(false);
    };
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    const Delete = () => {
        deleteService(serviceId,headers).then((data)=>{
            if (data) {
                open(false);
            }
        })
    };
    
  return (
    <div
    onClick={close}
    className="fixed z-50 flex justify-center items-center top-0 bottom-0 rounded z-5 0 right-0 left-0 "
>
    <div className="center flex justify-center items-center flex-col w-[300px] md:w-[500px] p-8 opacity-100">
        <div className="w-full flex justify-center text-xl text-red-600">
            Are you sure you want to delete SERVICE ?
        </div>
        <div className="flex gap-8 pt-8">
            <button
                onClick={close}
                className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2  border border-green-500 hover:border-transparent w-24  text-center rounded"
            >
                cancel
            </button>
            <button
                onClick={Delete}
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2  border border-red-500 hover:border-transparent w-24  text-center rounded"
            >
                delete
            </button>
        </div>
    </div>
</div>
  )
}

export default Deleteservice