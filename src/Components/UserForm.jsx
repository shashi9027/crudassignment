import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFields } from "../config/FieldsSchema";

const schemaShape = {};

formFields.forEach((f) => {
  let fieldSchema = z.string();
  if (f.name === "email") {
    fieldSchema = fieldSchema.email("Invalid email address");
  }
  if (f.name === "phone") {
    fieldSchema = fieldSchema.regex(
      /^[6-9]\d{9}$/,
      "Phone number must be a valid 10-digit Indian number"
    );
  }
  if (f.required) {
    fieldSchema = fieldSchema.min(1, `${f.label} is required`);
  } else {
    fieldSchema = fieldSchema.optional();
  }

  schemaShape[f.name] = fieldSchema;
});


const formSchema = z.object(schemaShape);

export default function UserForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({});
    }
  }, [initialData, reset]);
  
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} style={{ marginBottom: 20 }}>
      <h3>{initialData ? "Edit User" : "Add User"}</h3>

      {formFields.map((field) => (
        <div key={field.name} style={{ marginBottom: 10 }}>
          <label>{field.label}</label>
          <br />
          <input
            type={field.type}
            {...register(field.name)}
            style={{ padding: 6, width: 250 }}
          />
          {errors[field.name] && (
            <div style={{ color: "red" }}>{errors[field.name].message}</div>
          )}
        </div>
      ))}

      <button style={{background:"lightblue"}} type="submit">{initialData ? "Update" : "Create"}</button>
      {initialData && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
          Cancel
        </button>
      )}
    </form>
  );
}
