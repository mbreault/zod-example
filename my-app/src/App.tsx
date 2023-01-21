import React, { useState, ChangeEvent } from "react";
import * as Z from "zod";

const schema = Z.object({
  name: Z.string().min(1)
});

function App() {
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({ name: {message: ""} });

  const handleChange = (e: ChangeEvent<HTMLInputElement>)  => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    const validation = schema.safeParse(formData);
    if(validation.success){
      alert(`Hello, ${validation.data.name}!`);
    }else{
      setErrors({ name: { message: validation.error.message } });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
