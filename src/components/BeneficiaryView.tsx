// File: src/components/BeneficiaryView.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import '../assets/css/BeneficiaryView.css';

const BeneficiaryView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const beneficiary = useSelector((state: RootState) =>
    state.beneficiaries.items.find(b => b.id === Number(id))
  );

  if (!beneficiary) {
    return <div className="view-container">Beneficiary not found</div>;
  }

  return (
    <div className="view-container">
      <h2>Beneficiary Details</h2>
      <div className="view-item">
        <strong>Full Name:</strong> {beneficiary.fullName}
      </div>
      <div className="view-item">
        <strong>Address:</strong> {beneficiary.address}
      </div>
      <div className="view-item">
        <strong>Country:</strong> {beneficiary.country}
      </div>
      <div className="view-item">
        <strong>Pincode:</strong> {beneficiary.pincode}
      </div>
      <button onClick={() => navigate('/')}>Back to List</button>
    </div>
  );
};

export default BeneficiaryView;
