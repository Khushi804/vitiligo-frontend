import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography, CircularProgress, Alert, Divider } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setError('');
      setResult(''); // Clear the result if a new image is uploaded
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
    setError('');

    // Simulate analysis process
    setTimeout(() => {
      setIsUploading(false);
      setResult('Analysis Result: The image contains a beautiful landscape!');
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-4xl p-4 shadow-lg">
        <Typography variant="h4" align="center" gutterBottom className="font-bold text-gray-700">
          Vitiligo Prediction And Analysis
        </Typography>
        <Divider className="my-4" />
        <Grid container spacing={4}>
          {/* Left Container: Image Upload */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" className="h-full">
              <CardContent className="flex flex-col items-center">
                <Typography variant="h6" gutterBottom>
                  Upload an Image
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<ImageIcon />}
                  className="bg-white hover:bg-gray-100 border-blue-500 text-blue-500"
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
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-w-full max-h-48 mt-4 rounded-lg shadow-md"
                  />
                )}
                {error && (
                  <Alert severity="error" className="w-full mt-3">
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
                    'Upload & Analyze'
                  )}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Container: Result Display */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" className="h-full">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <Typography variant="h6" gutterBottom>
                  Analysis Result
                </Typography>
                <Divider className="my-2 w-full" />
                {isUploading ? (
                  <CircularProgress size={40} className="text-blue-600" />
                ) : result ? (
                  <Alert
                    severity="success"
                    icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                    className="w-full"
                  >
                    {result}
                  </Alert>
                ) : (
                  <Typography variant="body1" className="text-gray-500">
                    No analysis performed yet. Upload an image to see results.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ImageUpload;
