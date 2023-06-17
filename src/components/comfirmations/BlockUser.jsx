import React from 'react'
import { HandleUserblock} from '../../Api/AdminAPI';

function BlockUser({ open, userId, block }) {
    const close = () => {
        open(false);
    };

    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    const performAction = async () => {
        try {
            await HandleUserblock(userId,block, headers);
            open(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            onClick={close}
            className="fixed z-50 flex justify-center items-center top-0 bottom-0 rounded z-5 0 right-0 left-0 "
        >
            <div className="center flex justify-center items-center flex-col w-[300px] md:w-[500px] p-8 opacity-100">
                <div className="w-full flex justify-center text-xl text-red-600">
                    {block ? 'Are you sure you want to Unblock this user?' : 'Are you sure you want to Block this user?'}
                </div>
                <div className="flex gap-8 pt-8">
                    <button
                        onClick={close}
                        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2  border border-green-500 hover:border-transparent w-24  text-center rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={performAction}
                        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2  border border-red-500 hover:border-transparent w-24  text-center rounded"
                    >
                        {block ?  'Block':'Unblock'}
                    </button>
                </div>
            </div>
        </div>
    );
}


export default BlockUser