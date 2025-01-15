import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please select a valid image file.');
    }
  };

  const handleUpload = () => {
    if (!selectedImage) {
      setError('Please select an image before uploading.');
      return;
    }
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      alert('Image uploaded successfully!');
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader
          title={
            <Typography variant="h5" className="text-center font-bold">
              Image Upload
            </Typography>
          }
          subheader={
            <Typography variant="subtitle1" className="text-center text-gray-600">
              Select and upload an image
            </Typography>
          }
          className="pb-0"
        />
        <CardContent className="flex flex-col items-center space-y-4">
          <Button
            variant="outlined"
            component="label"
            startIcon={<ImageIcon />}
            className="bg-white hover:bg-gray-50 border-blue-500 text-blue-500"
          >
            Choose Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {selectedImage && (
            <div className="mt-4 w-full">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-48 mx-auto rounded-lg shadow-md"
              />
            </div>
          )}
          {error && (
            <Alert severity="error" className="w-full">
              {error}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpload}
            disabled={isUploading}
            className="mt-4 py-2 bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Upload Image'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUpload;

