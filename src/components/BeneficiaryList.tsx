// File: src/components/BeneficiaryList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/BeneficiaryList.css';
import { FaEdit } from 'react-icons/fa';
import { BsTrash3Fill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import ConfirmModal from './ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { removeBeneficiary, setBeneficiaries } from '../store/beneficiarySlice';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

const BeneficiaryList: React.FC = () => {

const beneficiaries = useSelector((state: RootState) => state.beneficiaries.items);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleEdit = (id: number) => navigate(`/edit/${id}`);
  const handleView = (id: number) => navigate(`/view/${id}`);

  // Load from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('beneficiaries');
    if (stored) {
      dispatch(setBeneficiaries(JSON.parse(stored)));
    }
  }, [dispatch]);

  // Save to localStorage whenever beneficiaries change
  React.useEffect(() => {
    localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  const handleRemoveClick = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    if (selectedId !== null) {
      dispatch(removeBeneficiary(selectedId));
      setSelectedId(null);
      setShowModal(false);
    }
  };

  const handleCancelRemove = () => {
    setSelectedId(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="header grid grid-flow-col">
        <div className='flex gap-2'>
        <MdOutlineSpaceDashboard className='col-span-2' size={24}/>
        <h2 className='col-span-2'>Manage Beneficiary</h2>
        </div>
      <div>
        <FaRegUserCircle className='ml-auto mr-4' size={24} />
      </div>
      </div>
      <div className="beneficiary-container">
      <div className='grid grid-flow-col gap-2'>
        <p className="breadcrumb">Home / List of beneficiaries</p>
        <div>
          <button className="add-btn" onClick={() => navigate('/add')}>Add Beneficiary</button>
        </div>
      </div>
      <table className="beneficiary-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Country</th>
            <th>PinCode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td>{b.fullName}</td>
              <td>{b.address}</td>
              <td>{b.country}</td>
              <td>{b.pincode}</td>
              <td>
                <div className="flex gap-2">
                <div className="icon-btn" onClick={() => handleEdit(b.id)}><FaEdit size={24}/></div>
                <div className="icon-btn" onClick={() => handleRemoveClick(b.id)}><BsTrash3Fill size={24}/></div>
                <div className="icon-btn" onClick={() => handleView(b.id)}><FaEye size={24}/></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to remove this beneficiary?"
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </>
  );
};

export default BeneficiaryList;
