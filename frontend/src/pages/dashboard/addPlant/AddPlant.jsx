import React, { useState } from 'react';
import InputField from './InputFiled';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddPlantMutation } from '../../../redux/features/plants/plantsApi';

const AddPlant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addPlant, { isLoading }] = useAddPlantMutation();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageFileName, setImageFileName] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/api/plants/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log('Upload response:', data);
        console.log('Image uploaded:', data.url); // ✅ FIXED
        setImageUrl(data.url);
        setImageFileName(file.name);
      } else {
        console.error('Upload failed:', data.message);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false); // Stop loading
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!imageUrl) {
        alert('Please upload an image first.');
        return;
      }

      const newPlantData = {
        ...data,
        coverImage: imageUrl,
        trending: data.trending || false,
        oldPrice: parseFloat(data.oldPrice),
        newPrice: parseFloat(data.newPrice),
        stock: parseInt(data.stock),
      };

      await addPlant(newPlantData).unwrap();

      Swal.fire({
        title: 'Plant Added',
        text: 'Your plant has been uploaded successfully!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Okay',
      });

      reset();
      setImageUrl('');
      setImageFileName('');
    } catch (error) {
      console.error(error);
      alert('Failed to add plant. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Plant</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter plant title"
          register={register}
          required
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter description"
          type="textarea"
          register={register}
          required
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Pilih kategori' },
            { value: 'hias', label: 'Hias' },
            { value: 'herbal', label: 'Herbal' },
            { value: 'hanging', label: 'Hanging' },
            { value: 'indoor', label: 'Indoor' },
            { value: 'outdoor', label: 'Outdoor' },
            { value: 'penghijauan', label: 'Penghijauan' },
            { value: 'media-tanam', label: 'Media Tanam' },
            { value: 'tanaman-buah', label: 'Tanaman Buah' },
          ]}
          register={register}
          required
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
          required
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
          required
        />

        <InputField
          label="Stock"
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          register={register}
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {uploading ? (
            <p className="text-sm text-blue-500">Uploading...</p>
          ) : imageUrl ? (
            <p className="text-sm text-green-600">Uploaded ✅ {imageFileName}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? 'Adding...' : 'Add Plant'}
        </button>
      </form>
    </div>
  );
};

export default AddPlant;
