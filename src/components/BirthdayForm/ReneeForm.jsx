import React from 'react';
import { useForm } from 'react-hook-form';
import './ReneeForm.css';

const ReneeForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => console.log(data)

    return (
       <div className='renee-form-container'>
        <h2 className='reneeForm-header-margin'>Fill this out</h2>
        <p className="reneeForm-introText-margin">Just fill out the parts of this you can. <strong>Please</strong> add a picture.</p>
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
                {...register("greeting", {required: true})}
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
            <input className="form-submit-button" type="submit" />
        </form>
       </div>
    );
};

export default ReneeForm;