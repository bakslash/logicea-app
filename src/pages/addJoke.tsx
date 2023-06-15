import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { addJoke } from '../services/apis';
import CustomCard from '../components/card/customCard';
import JokesLayout from '../layouts/layout';
import { useNavigate } from 'react-router-dom';
import ReusableButton from "../components/button/button";

const AddFormPage: React.FC = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Views: 0,
    CreatedAt: "",

  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      console.log('data', formData);

      await addJoke(formData);
      console.log("Form submitted:", formData);
      setFormData({
        Title: '',
        Author: '',
        Views: 0,
        CreatedAt: '',
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const handleClose = () => {
    navigate(-1);
    console.log("Page closed");
  };
  const token = localStorage.getItem('token');

  return (
    <JokesLayout token={token}>

      <CustomCard title="Add Joke">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Title"
                name="Title"
                value={formData.Title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Author"
                name="Author"
                value={formData.Author}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Views"
                type="number"
                name="Views"
                value={formData.Views}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Created Date"
                name="CreatedAt"
                type="date"
                value={formData.CreatedAt}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ReusableButton
                variant="contained"
                style={{ margin: 10 }}
                size="small"
                color="success"
                label={"Add Joke"}
                onClick={handleSubmit}     >

              </ReusableButton>
              <ReusableButton
                variant="contained"
                style={{ margin: 10 }}
                size="small"
                color="warning"
                label={"Close"}
                onClick={handleClose}     >

              </ReusableButton>

            </Grid>
          </Grid>
        </form>
      </CustomCard>
    </JokesLayout>
  );
};

export default AddFormPage;
