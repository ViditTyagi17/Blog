import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import conf from '../conf/conf';

export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
        <Editor
        apiKey={conf.key}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}



// 🧭 React Hook Form — Controller + Control + Field Explained

// ▶ useForm()
// - Creates a "form instance" that manages and stores all input values and validation.
// - Returns an object like { control, register, handleSubmit, ... }.

// ▶ control
// - It’s an object created by useForm().
// - It acts like the "brain" or central storage of the form.
// - It stores the state (value, touched, errors) of all fields in that form.

// ▶ Controller
// - A special component provided by React Hook Form.
// - It connects "non-standard" inputs (like TinyMCE, React Select, MUI TextField, etc.) to the control object.
// - It tells React Hook Form how to manage these inputs manually.
// - Props used:
//    • name → unique field name in form
//    • control → the control object from useForm()
//    • render → function that defines how to display and connect the component

// ▶ render={({ field }) => ( ... )}
// - The render prop gives access to a 'field' object.
// - This 'field' object contains methods and values used to read/write data from the form state.

// ▶ field object contains:
//    • field.value → current value of this input (comes from the control object)
//    • field.onChange → updates the control object when the input changes
//    • field.onBlur → marks input as touched (used for validation)
//    • field.name → the unique field name
//    • field.ref → reference to the actual DOM element (used internally)

// ▶ Working of Controller:
// - 'control' stores all the form data.
// - 'Controller' connects custom components to 'control'.
// - 'field.value' reads data from 'control'.
// - 'field.onChange' writes data back into 'control' when the user types or changes something.
// - So, 'field.value' and 'field.onChange' are the bridge between your custom component and form state.

// ▶ Summary:
// - useForm() → creates the form system
// - control → central data manager for form
// - Controller → connector for custom inputs
// - field → provides methods to get/set values
// - field.value → read value from form
// - field.onChange → update form data

// 🧩 Example Flow:
// 1️⃣ User types inside TinyMCE editor
// 2️⃣ field.onChange() runs → updates 'control' with new value
// 3️⃣ When form re-renders, field.value → sends latest value back to TinyMCE
