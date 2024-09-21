import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import './FormEditor.css';  // Import the custom CSS file

const initialFields = [
  { id: 'welcome', type: 'Welcome Screen', label: 'Welcome Screen', title: '', description: '', photoUrl: '' },
  { id: 'name', type: 'Enter Name', label: 'Enter Name', title: '', description: '' },
  { id: 'email', type: 'Enter Email', label: 'Enter Email', title: '', description: '' },
];

const additionalFields = [
  { id: 'checkbox', type: 'Checkbox' },
  { id: 'dropdown', type: 'Dropdown' },
  { id: 'radio', type: 'Radio Button' },
  { id: 'text', type: 'Text Input' },
];

const FormEditor = () => {
  const [fields, setFields] = useState(initialFields);
  const [selectedField, setSelectedField] = useState(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const selectField = (field) => {
    setSelectedField(field);
    setShowAdditionalFields(false);
  };

  const addField = (fieldType) => {
    const newField = {
      id: `field-${Date.now()}`,
      type: fieldType,
      label: `New ${fieldType}`,
      title: '',
      description: '',
      photoUrl: fieldType === 'Welcome Screen' ? '' : undefined,
    };
    setFields([...fields, newField]);
    setSelectedField(newField);
    setShowAdditionalFields(false);
  };

  const updateField = (updatedField) => {
    const updatedFields = fields.map(field => 
      field.id === updatedField.id ? updatedField : field
    );
    setFields(updatedFields);
    setSelectedField(updatedField);
  };

  const handlePhotoUpload = (e) => {
    if (selectedField && selectedField.type === 'Welcome Screen') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateField({ ...selectedField, photoUrl: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const renderFieldPreview = (field) => {
    switch (field.type) {
      case 'Welcome Screen':
        return (
          <div className="field-preview">
            <h2>{field.title || 'Welcome'}</h2>
            <p>{field.description || 'Welcome description'}</p>
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mt-2">
              {field.photoUrl ? (
                <img src={field.photoUrl} alt="Uploaded" className="w-full h-full object-cover" />
              ) : (
                <Camera size={48} />
              )}
            </div>
          </div>
        );
      case 'Enter Name':
        return (
          <div className="field-preview">
            <label>{field.title || 'Enter Name'}</label>
            <p>{field.description}</p>
            <input type="text" className="form-input" placeholder="Enter your name" />
          </div>
        );
      case 'Enter Email':
        return (
          <div className="field-preview">
            <label>{field.title || 'Enter Email'}</label>
            <p>{field.description}</p>
            <input type="email" className="form-input" placeholder="Enter your email" />
          </div>
        );
      case 'Checkbox':
        return (
          <div className="field-preview">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>{field.title || 'Checkbox'}</span>
            </label>
            <p className="mt-1">{field.description}</p>
          </div>
        );
      case 'Dropdown':
        return (
          <div className="field-preview">
            <label>{field.title || 'Dropdown'}</label>
            <p>{field.description}</p>
            <select className="form-input">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        );
      case 'Radio Button':
        return (
          <div className="field-preview">
            <p>{field.title || 'Radio Button'}</p>
            <p>{field.description}</p>
            <div>
              <label className="flex items-center mb-1">
                <input type="radio" name={`radio-${field.id}`} className="mr-2" />
                <span>Option 1</span>
              </label>
              <label className="flex items-center mb-1">
                <input type="radio" name={`radio-${field.id}`} className="mr-2" />
                <span>Option 2</span>
              </label>
            </div>
          </div>
        );
      case 'Text Input':
        return (
          <div className="field-preview">
            <label>{field.title || 'Text Input'}</label>
            <p>{field.description}</p>
            <input type="text" className="form-input" placeholder="Enter text" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-editor">
      {/* Left Sidebar - Form Fields */}
      <div className="form-sidebar">
        <h2>Form Fields</h2>
        {fields.map((field) => (
          <button
            key={field.id}
            onClick={() => selectField(field)}
            className="field-button"
          >
            {field.label}
          </button>
        ))}
        <button
          onClick={() => setShowAdditionalFields(!showAdditionalFields)}
          className="add-field-btn"
        >
          Add Field
        </button>
        {showAdditionalFields && (
          <div className="mt-2">
            {additionalFields.map((field) => (
              <button
                key={field.id}
                onClick={() => addField(field.type)}
                className="additional-field-button"
              >
                Add {field.type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Middle - Canvas Preview */}
      <div className="canvas-preview">
        <h2>Canvas Preview</h2>
        <div className="field-preview-container">
          {fields.map(field => renderFieldPreview(field))}
        </div>
      </div>

      {/* Right Sidebar - Field Editor */}
      <div className="field-editor">
        <h2>Field Editor</h2>
        {selectedField ? (
          <div>
            <h3>{selectedField.label}</h3>
            <label>
              Title:
              <input
                value={selectedField.title || ''}
                onChange={(e) => updateField({ ...selectedField, title: e.target.value })}
                className="form-input"
              />
            </label>
            <label>
              Description:
              <textarea
                value={selectedField.description || ''}
                onChange={(e) => updateField({ ...selectedField, description: e.target.value })}
                className="form-textarea"
              />
            </label>
            {selectedField.type === 'Welcome Screen' && (
              <div className="mb-2">
                <p>Upload Photo:</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="file-input"
                />
              </div>
            )}
          </div>
        ) : (
          <p>Select a field to edit its properties</p>
        )}
      </div>
    </div>
  );
};

export default FormEditor;