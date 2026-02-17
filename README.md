## setup
git clone https://github.com/shashi9027/crudassignment.git
npm install

## how to add new fields
The form is driven by a configuration file: src/config/FieldsSchema.js
To add a new field (for example, Address), just add one line:
{ name: "address", label: "Address", type: "text", required: false }

To add validation for this field you have to go in UserForm.jsx and add a condition like this 
if (f.name === "address") {
    add a validation condition here
}

