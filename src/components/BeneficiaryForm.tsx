// File: src/components/BeneficiaryForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';
import { addBeneficiary, updateBeneficiary } from '../store/beneficiarySlice';
import '../assets/css/BeneficiaryForm.css';

interface FormData {
  fullName: string;
  address: string;
  country: string;
  pincode: string;
}

const BeneficiaryForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const beneficiaries = useSelector((state: RootState) => state.beneficiaries.items);
  const isEdit = Boolean(id);

  const defaultValues = isEdit
    ? beneficiaries.find(b => b.id === Number(id)) || {
        fullName: '',
        address: '',
        country: '',
        pincode: '',
      }
    : {
        fullName: '',
        address: '',
        country: '',
        pincode: '',
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const onSubmit = (data: FormData) => {
    // Check if a beneficiary with the same name already exists
    const isDuplicate = beneficiaries.some(
      (b) => b.fullName.toLowerCase() === data.fullName.toLowerCase() && (!isEdit || b.id !== Number(id))
    );

    if (isDuplicate) {
      alert('Beneficiary with this name already exists!');
      return; // Prevent form submission
    }

    if (isEdit) {
      dispatch(updateBeneficiary({ ...data, id: Number(id) }));
    } else {
      const newId = new Date().getTime();
      dispatch(addBeneficiary({ ...data, id: newId }));
    }
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Beneficiary' : 'Add Beneficiary'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Full Name:</label>
          <input {...register("fullName", { required: "Full Name is required" })} />
          {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input {...register("address", { required: "Address is required" })} />
          {errors.address && <p className="error-message">{errors.address.message}</p>}
        </div>

        <div className="form-group">
          <label>Country:</label>
          <select {...register("country", { required: "Country is required" })}>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
          {errors.country && <p className="error-message">{errors.country.message}</p>}
        </div>

        <div className="form-group">
          <label>Pincode:</label>
          <input
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Pincode must be a 6-digit number",
              },
            })}
          />
          {errors.pincode && <p className="error-message">{errors.pincode.message}</p>}
        </div>

        <div className="button-group">
          <button className="add" type="submit">{isEdit ? 'Update' : 'Add'}</button>
          <button className="cancel" type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BeneficiaryForm;