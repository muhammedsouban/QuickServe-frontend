import React, { useEffect, useState } from 'react';
import AddCategoryModel from './addCategory';
import EditCategoryModel from './editCategory';
import DeleteCategory from '../.././comfirmations/DeleteCategory'
import { MdDelete, MdEdit } from 'react-icons/md'
import { getCategories } from '../../../Api/AdminAPI';
import BASE_URL from '../../../config/config';
function Category() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [CategoryId, setCategoryId] = useState('');
  const [category, setCategory] = useState([])

  useEffect(() => {
    getCategories().then((data) => {
      setCategory(data)
    })

  }, [showAddModal,showEditModal,showDeleteModal])

  const toggleModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleDelete = ((CategoryId) => {
    setShowDeleteModal(true);
    setCategoryId(CategoryId);
  })
  const handleEdit = ((CategoryId) => {
    setShowEditModal(true)
    setCategoryId(CategoryId);
  })
  const filteredData = category.filter((item) =>
    item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col mx-auto max-w-screen-lg mt-10" >
        <div className="flex justify-between items-center mb-4 px-6 md:px-0">
        <div className="relative">
                        <input
                            type="text"
                            className="py-2 px-4 w-full md:w-72 border border-gray-400 rounded-lg pr-10 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-900"
                            value={searchTerm}
                            onChange={((e) => setSearchTerm(e.target.value))}
                            placeholder="Search..."
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                            <svg
                                className="fill-current h-4 w-4 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M18.56 16.44l-3.76-3.78a6.77 6.77 0 1 0-.86.86l3.78 3.76a.61.61 0 0 0 .86 0 .61.61 0 0 0 0-.84zM6.5 12.5a5 5 0 1 1 7.08 0A5 5 0 0 1 6.5 12.5z" />
                            </svg>
                        </div>
                    </div>
          <button
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 md:text-xl text-xs px-2 rounded"
            onClick={toggleModal}
          >
            Add Category
          </button>
        </div>
        <div className=" overflow-x-auto ">
          <table className="table-auto w-full ">
            <thead className='text-white'>
              <tr className='bg-blue-900'>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead >
            <tbody className="text-center fle">
              {filteredData.map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">
                    <img className="w-[100px]" src={`${BASE_URL}/public/images/${item.image}`} alt="" />
                  </td>
                  <td className="border px-4 py-2">{item.categoryName}</td>
                  <td className="border px-4 py-2">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <MdDelete size={22} color="red" className="me-5" onClick={() => handleDelete(item._id)} />
                      <MdEdit color="green" size={22} onClick={() => handleEdit(item._id)} />
                    </span>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
          {showAddModal && (
            <div className="modal-overlay">
              <AddCategoryModel
                onClose={toggleModal}
                category={category}
              />
            </div>
          )}
          {showEditModal && (
            <div className="modal-overlay">
              <EditCategoryModel
                open={setShowEditModal}
                Id={CategoryId}
              />
            </div>
          )}
          {showDeleteModal && (
            <div className="modal-overlay">
              <DeleteCategory
                open={setShowDeleteModal}
                Id={CategoryId}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Category;
