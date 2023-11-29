import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button, DialogHeader, DialogBody, DialogFooter, Input, Textarea, Select, Option } from "@material-tailwind/react";

function EditTask() {
  const { id } = useParams();
  const location = useLocation(); 
  const navigate = useNavigate();
  const { state } = location;

  const [formData, setFormData] = useState({
    name: state.name || '',
    description: state.description || '',
    priority: state.priority || '',
  });

  const handleFormSubmit = () => {

    if (formData.name.trim() === '' || formData.description.trim() === '' || formData.priority.trim() === '') {
      alert('Please fill in all fields before updating the task.');
      return;
    }

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = existingTasks.map((task) =>
      task.id === id ? { ...task, ...formData } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    navigate('/');
  };

  return (
    <main className='bg-[#ecedec] p-10'>
      <div className='w-1/2 m-auto py-10 rounded-md  shadow-2xl'>
        {<DialogHeader>Edit Task <sub className='px-1 text-xs text-[#818385]'>#{id}</sub></DialogHeader>}
        <DialogBody>
          <div className="flex flex-col items-end gap-6">
            <Input
              size="lg"
              type="text"
              label="Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value, status: 'incomplete'})}
            />
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value, status: 'incomplete'})}
            />
            <Select
              label="Select Priority"
              name="priority"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e, status: 'incomplete'})}
            >
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => navigate('/')} 
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleFormSubmit}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </div>
    </main>
  );
}

export default EditTask;
