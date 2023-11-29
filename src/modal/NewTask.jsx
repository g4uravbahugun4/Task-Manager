import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea, Select, Option } from "@material-tailwind/react";
import { v4 as uuidv4 } from 'uuid';

export function NewTask({ open, setOpen }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");

  const handleOpen = () => setOpen(!open);

  const getCurrentDate = () => {
    const currentDate = new Date();
    return `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  };

  const isFormValid = () => {
    return taskName.trim() !== "" && taskDescription.trim() !== "" && taskPriority.trim() !== "";
  };

  const handleAddTask = () => {
    if (isFormValid()) {
      const taskId = uuidv4();
      const newTask = {
        id: taskId,
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        date: getCurrentDate(),
        status: "incomplete",
      };

     
      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      
      existingTasks.push(newTask);

      
      localStorage.setItem("tasks", JSON.stringify(existingTasks));

      const storageUpdateEvent = new Event('storageUpdate');
      window.dispatchEvent(storageUpdateEvent);

      
      handleOpen();
    } else {
      alert("Please fill in all fields before adding a new task.");
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Task</DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-end gap-6">
            <Input
              size="lg"
              type="text"
              label="Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Textarea
              label="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <Select
              label="Select Priority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e)}
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
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleAddTask}>
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
