import React from "react";
import { useForm } from "react-hook-form";
import "./ReneeForm.css";
import { put } from '@vercel/blob';

const ReneeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    console.log(data);
    const name = data.name.replace(/\s/g, "")
    try {
      
        const url = await put(`response/${name}`, data, { access: 'private' }).then(
            console.log('File uploaded successfully:', url)
        );
      // Handle the response (e.g., store the URL in your database)
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="renee-form-container">
      <h2 className="reneeForm-header-margin">Fill this out</h2>
      <p className="reneeForm-introText-margin">
        Just fill out the parts of this you can. <strong>Please</strong> add a
        picture or two.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name*: </label>

        {/* use aria-invalid to indicate field contain error */}
        <input
          id="name"
          placeholder="So Renée knows who is sending this"
          aria-invalid={errors.name ? "true" : "false"}
          {...register("name", { required: true, maxLength: 50 })}
        />

        {/* use role="alert" to announce the error message */}
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
        <label htmlFor="origin">Favorite Renée Memory: </label>
        <textarea
          id="memory"
          placeholder="Share a memory of Renée."
          {...register("origin")}
        />

        <label htmlFor="images">Upload Image(s):</label>
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          {...register("images", {
            validate: {
              maxSize: (files) => {
                if (files.length > 0) {
                  for (let file of files) {
                    if (file.size > 5 * 1024 * 1024) {
                      return "Each file must be less than 3MB";
                    }
                  }
                }
                return true;
              },
            },
          })}
        />
        {errors.images && <span role="alert">{errors.images.message}</span>}
        <input className="form-submit-button" type="submit" />
      </form>
    </div>
  );
};

export default ReneeForm;
