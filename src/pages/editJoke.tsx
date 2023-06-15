import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {  Grid, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { editJoke, deleteJoke } from "../services/apis";
import CustomCard from '../components/card/customCard'
import JokesLayout from "../layouts/layout";
import { useNavigate } from 'react-router-dom';
import ReusableButton from "../components/button/button";


const EditFormPage = () => {
  const { id } = useParams(); // Get the joke ID from the URL params

  const location = useLocation();
  const navigate = useNavigate();

  const { Title, Author, Views, CreatedAt } = location.state;

  const [formData, setFormData] = useState({
    Title,
    Author,
    Views,
    CreatedAt,
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditJoke = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await editJoke(id, formData);
      console.log("joke edited:", response);
      console.log("Form submitted:", formData);
      setFormData({
        Title: "",
        Author: "",
        Views: "",
        CreatedAt: "",
      });

    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleDelete = async (e: any) => {
    try {
      const res = await deleteJoke(id);
      console.log("joke deleted:", res);
      setFormData({
        Title: "",
        Author: "",
        Views: "",
        CreatedAt: "",
      });
    } catch (err) {
      console.log("Error:", err);
    }
    console.log("Item deleted");
  };

  const handleClose = () => {
    navigate("/");
    console.log("Page closed");
  };


  const token = localStorage.getItem('token');

  return (
    <JokesLayout token={token}>
      <CustomCard title="Edit Joke">
        <form>
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
                defaultValue={formData.CreatedAt}
                disabled={!!formData.CreatedAt}
                onChange={handleChange}
                fullWidth
              />

            </Grid>
            <Grid item xs={12}>
              <ReusableButton
                variant="contained"
                style={{ margin: 10 }}
                size="small"
                color="primary"
                label="Edit Joke"
                onClick={handleEditJoke}
              />
              <ReusableButton
                variant="contained"
                style={{ margin: 10 }}
                size="small"
                color="warning"
                label="Close"
                onClick={handleClose}
              />
              <ReusableButton
                variant="contained"
                style={{ margin: 10 }}
                size="small"
                color="error"
                label="Delete"
                onClick={handleDelete}
              />
            </Grid>
          </Grid>
        </form>
      </CustomCard>
    </JokesLayout>
  );
};

export default EditFormPage;
