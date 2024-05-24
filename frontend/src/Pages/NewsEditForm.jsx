import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Container,
  Typography,
  TextField,
  IconButton,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import Resizer from 'react-image-file-resizer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const NewsEditForm = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [editableField, setEditableField] = useState('');
  const [editedFields, setEditedFields] = useState(new Set());
  const [titleError, setTitleError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [youtubePreviewUrl, setYoutubePreviewUrl] = useState('');

  // Define the order of input fields and their labels
  const fieldOrder = [
    { name: 'title', label: 'Title' },
    { name: 'category', label: 'Category' },
    { name: 'reporterName', label: 'Reporter Name' },
    { name: 'tags', label: 'Tags' },
    { name: 'heading1', label: 'Sub-heading 1' },
    { name: 'description1', label: 'Paragraph 1', multiline: true, rows: 8 },
    { name: 'heading2', label: 'Sub-heading 2' },
    { name: 'description2', label: 'Paragraph 2', multiline: true, rows: 8 },
    { name: 'heading3', label: 'Sub-heading 3' },
    { name: 'description3', label: 'Paragraph 3', multiline: true, rows: 8 },
    { name: 'heading4', label: 'Sub-heading 4' },
    { name: 'description4', label: 'Paragraph 4', multiline: true, rows: 8 },
    { name: 'heading5', label: 'Sub-heading 5' },
    { name: 'description5', label: 'Paragraph 5', multiline: true, rows: 8 },
    { name: 'imageFile', label: 'Image Preview', preview: true },
    { name: 'imageCredit', label: 'Image Credit' },
    { name: 'youtubeUrl', label: 'YouTube Video Link' },
    { name: 'youtubePreview', label: 'video preview appears here' },
    { name: 'videoCredit', label: 'Video Credit' },
    // Add more fields here as needed
  ];

  const inputRefs = {}; // Object to store input field refs

  // Fetch news data from the database based on the id
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormValues(data);
          // Set youtube preview URL if youtubeUrl exists
          if (data.youtubeUrl) {
            setYoutubePreviewUrl(`https://www.youtube.com/embed/${getVideoId(data.youtubeUrl)}`);
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching news: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  // Function to extract YouTube video ID from URL
  const getVideoId = (url) => {
    // Regular expression to extract video ID from various YouTube URL formats
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setEditedFields((prev) => new Set(prev).add(name)); // Track edited fields
  };

  // Handle edit button click
  const handleEdit = (fieldName) => {
    setEditableField(fieldName); // Set editable field
    // Focus on the input field corresponding to the edited field
    if (inputRefs[fieldName]) {
      inputRefs[fieldName].focus();
    }
  };

  // Function to resize and upload image
  const resizeAndUploadImage = async (file, path, maxWidth, maxHeight) => {
    const resizedImage = await resizeFile(file, maxWidth, maxHeight);
    return uploadFile(resizedImage, path);
  };

  // Function to resize the image
  const resizeFile = (file, maxWidth, maxHeight) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file'
      );
    });

  // Function to upload file
  const uploadFile = async (file, path) => {
    if (!file) return null;
    setLoading(true);
    const fileRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    setLoading(false);
    return url;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if title is empty
    if (!formValues.title) {
      setTitleError(true);
      return;
    }

    setLoading(true);

    try {
      // Add editedTime and editorEmail to formValues
      const updatedFormValues = {
        ...formValues,
        editedTime: Date.now(),
        editorEmail: currentUser.email,
      };

      // Resize and upload image if image file is edited
      if (editedFields.has('imageFile')) {
        const imageUrl = await resizeAndUploadImage(
          updatedFormValues.imageFile,
          'images',
          820,
          800
        );
        // Update form values with the new image URL
        updatedFormValues.imageUrl = imageUrl;
        //for thumbnailUrl
        const thumbnailUrl = await resizeAndUploadImage(
          updatedFormValues.imageFile,
          'images/thumbnails',
          200,
          150
        );
        // Update form values with the new thumbnailURL
        updatedFormValues.thumbnailUrl = thumbnailUrl;
      }

      // Update Firestore document with new form values
      const docRef = doc(db, 'news', id);
      await updateDoc(docRef, updatedFormValues);

      setLoading(false);
      alert('News updated successfully');
      navigate('/newsmanager');
    } catch (error) {
      console.error('Error updating news: ', error);
      setLoading(false);
      alert(`Error updating news: ${error.message}`);
    }
  };

  // Handle Youtube URL change
  const handleYoutubeUrlChange = (e) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      youtubeUrl: value,
    }));

    // Extract video ID from the URL
    const videoId = getVideoId(value);

    // Set video preview URL if a valid video ID is extracted
    if (videoId) {
      setYoutubePreviewUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setYoutubePreviewUrl('');
    }
  };

  // Handle image change button click
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await resizeAndUploadImage(file, 'images', 820, 800);
      setFormValues((prev) => ({ ...prev, imageUrl }));
      const thumbnailUrl = await resizeAndUploadImage(file, 'images/thumbnails', 200, 150);
      setFormValues((prev) => ({ ...prev, thumbnailUrl }));
    }
  };

  // Function to render image or video preview
  const renderPreview = (name) => {
    if (name === 'imageFile') {
      return (
        <img src={formValues.imageUrl} alt="Preview" style={{ width: 200, height: 'auto' }} />
      );
    } else if (name === 'youtubePreview') {
      return youtubePreviewUrl ? (
        <iframe
          width="200"
          height="150"
          src={youtubePreviewUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div>No video available</div>
      );
    }
  };

  // Create a ref for the youtubeUrl TextField
  const youtubeUrlRef = useRef(null);

  // Handle edit button click for youtubeUrl
  const handleYoutubeUrlEdit = () => {
    // Focus on the youtubeUrl TextField
    if (youtubeUrlRef.current) {
      youtubeUrlRef.current.focus();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '1rem', paddingTop: '1rem', marginBottom: '1rem', backgroundColor: '#F8F8F8' }}>
        <Button onClick={() => navigate('/admin')} variant="contained" color="primary">
          Admin Page
        </Button>
        <Button onClick={() => navigate('/newsmanager')} variant="contained" color="primary">
          News Manager
        </Button>
        <Button onClick={() => navigate('/')} variant="contained" color="primary" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Home
        </Button>
      </div>
      <Container>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            News Edit Form
          </Typography>
          {/* Render input fields in the specified order */}
          {fieldOrder.map(({ name, label, multiline, rows, preview }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
              {preview && name !== 'imageFile' && name !== 'youtubePreview' ? (
                renderPreview(name)
              ) : name === 'category' ? (
                <FormControl fullWidth margin="normal" required>
                  <FormLabel component="legend">{label}</FormLabel>
                  <Select value={formValues.category || ''} onChange={handleChange} name="category" displayEmpty>
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    {[
                      'kerala',
                      'national',
                      'world',
                      'cinema',
                      'sports',
                      'lifestyle',
                      'business',
                      'astrology',
                      'automobile',
                      'analysis',
                      'crime',
                    ].map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : name === 'youtubeUrl' ? (
                <TextField
                  label={label}
                  name={name}
                  value={formValues[name] || ''}
                  onChange={handleYoutubeUrlChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: editableField !== name,
                  }}
                  inputRef={(ref) => {
                    inputRefs[name] = ref; // Save reference to input field
                    youtubeUrlRef.current = ref; // Assign ref to youtubeUrlRef.current
                  }}
                />
              ) : name === 'imageFile' ? (
                <div>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </Button>
                  {renderPreview(name)}
                </div>
              ) : name === 'youtubePreview' && formValues.youtubeUrl ? (
                <div>
                  {renderPreview(name)}
                </div>
              ) : (
                <TextField
                  label={label}
                  name={name}
                  value={formValues[name] || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: editableField !== name,
                  }}
                  multiline={multiline}
                  rows={rows}
                  required={name === 'title'} // Set title as required
                  error={name === 'title' && titleError} // Set error state for title field
                  inputRef={(ref) => (inputRefs[name] = ref)} // Save reference to input field
                />
              )}
              {name !== 'imageFile' && name !== 'youtubePreview' && (
                <IconButton
                  onClick={() => handleEdit(name)}
                  size="small"
                  color={editableField === name ? "success" : (editedFields.has(name) ? "warning" : 'inherit')}
                >
                  <EditIcon />
                </IconButton>
              )}

            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            {/* Submit button */}
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>

            {/* Redirect button */}
            <Button variant="contained" color="success" onClick={() => navigate('/newsmanager')}>
              Cancel & go back
            </Button>
          </div>


        </form>
      </Container>
    </div>
  );
};

export default NewsEditForm;
