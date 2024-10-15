import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./ReneeForm.css";
import axios from "axios";

const ReneeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const file = data.image[0];  // Get the first (and only) file
  
    if (!file) {
      console.log('Image required')
      return;  // Stop form submission if no image is provided
    }
  
    try {
      // Convert the image file to Base64
      const base64Image = await toBase64(file);
  
      // Prepare the payload to match the Lambda function's expected format
      const payload = {
        name: data.name,
        greeting: data.greeting,
        origin: data.origin,
        image: {
          name: file.name,
          lastModified: file.lastModified,
          size: file.size,
          type: file.type,
        },
        base64Image: base64Image  // Send the Base64-encoded image
      };
  
      console.log('Payload:', payload);
  
      // Send the payload using Axios
      const response = await axios.post('https://4j46qca8c5.execute-api.us-east-2.amazonaws.com/Prod/send-birthday-wish', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
    }
  };
  
  // Function to convert the file to Base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Remove "data:image/png;base64," prefix
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="renee-form-container">
      <h2 className="reneeForm-header-margin">Fill this out</h2>
      <p className="reneeForm-introText-margin">
        Just fill out the parts of this you can. This will only be shared with Renée.
        <br />
        <strong>Required: </strong> your name, a birthday wish, and a picture of you and Renée (or just a picture of you).
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name*: </label>
        <input
          id="name"
          placeholder="So Renée knows who is sending this"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name", { required: true, maxLength: 50 })}
        />
        {errors.name && errors.name.type === "required" && (
          <span role="alert">This is required</span>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <span role="alert">Max length exceeded</span>
        )}

        <label htmlFor="greeting">Birthday Greeting*: </label>
        <textarea
          id="greeting"
          placeholder="Send Renée a birthday greeting"
          aria-invalid={errors.greeting ? "true" : "false"}
          {...register("greeting", { required: true })}
        />
        {errors.greeting && errors.greeting.type === "required" && (
          <span role="alert">This is required</span>
        )}

        <label htmlFor="origin">Origin Story: </label>
        <textarea
          id="origin"
          placeholder="How did you and Renée meet. This can be a truthful story, or make something up, or feel free to leave it blank"
          {...register("origin")}
        />

        <label htmlFor="image">Upload Image*:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: "An image is required",  // Image is required
            validate: {
              fileSize: (fileList) => {
                const file = fileList[0];
                if (!file) {
                  return true; // No file selected, the "required" validation will catch it
                }
                return file.size <= 5 * 1024 * 1024 || "The file size must be less than 5MB";
              },
              fileType: (fileList) => {
                const file = fileList[0];
                if (!file) {
                  return true; // No file selected, the "required" validation will catch it
                }
                return /image\/(jpeg|png|gif)/.test(file.type) || "Only JPEG, PNG, or GIF files are allowed";
              },
            },
          })}
        />
        {errors.image && <span role="alert">{errors.image.message}</span>}


        <input className="form-submit-button" type="submit" />
      </form>
    </div>
  );
};

export default ReneeForm;
