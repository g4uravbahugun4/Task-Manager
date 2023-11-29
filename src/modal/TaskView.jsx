import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter, 
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Icons from "../svgs/icons";


 
export function TaskView({open,setOpen,name,description,id,priority,date}) {
 
const navigate=useNavigate()
  
 const handleOpen = () => setOpen(!open);
 
   useEffect(() => {
    // Handle navigation when the component mounts
    return () => {
      // Clean up any resources if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const editHandler = () => {
    navigate(`/edit/${id}`, { state: { name, description, priority ,date } });
  };

  
  const handleDelete = () => {
    // Get existing tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filter out the task to be deleted
    const updatedTasks = existingTasks.filter((task) => task.id !== id);

    // Save the updated tasks array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    const storageUpdateEvent = new Event('storageUpdate');
     window.dispatchEvent(storageUpdateEvent);    
    // Close the dialog
    handleOpen();
  };
 
 return (
    <>
    
       <Dialog open={open} handler={handleOpen} >
        <div className="flex items-center  justify-between">    
        <DialogHeader>{name} </DialogHeader>        
       <div className="mr-6 p-2 rounded-md cursor-pointer hover:bg-[#b0b5b7]" onClick={ editHandler} >
       {Icons.editIcon}</div> 
        </div>
     
       
        <DialogBody>
         {description}   
        </DialogBody>

         <DialogBody>
          <span className="text-[#4d4f50] font-semibold text-sm ">Created:</span>
         <span className="underline px-3 text-xs text-[#323334] font-bold">{date}</span>   
        </DialogBody>
        

         <DialogBody>
          <span className="text-[#4d4f50] font-semibold text-sm">Priority:</span>
          {priority==='Medium'?<span className="ml-3 bg-[#fae4d6] text-orange-600 rounded-md text-xs p-2">Medium</span>:priority==='Low'?
          <span className="ml-3 bg-[#d8fad6] text-green-600 rounded-md text-xs p-2">Low</span>:
          <span className="ml-3 bg-[#fad6d6] text-red-600 rounded-md text-xs p-2">High</span>}
         </DialogBody>
        
                  

        <DialogFooter className="flex justify-between">
         
         <div className="hover:scale-105 p-2 cursor-pointer rounded-md" onClick={handleDelete}>{Icons.deleteIcon}</div>
          
        <Button
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="mr-1"
          >
          <span>OK</span>
          </Button>
        
         
        </DialogFooter>
      </Dialog>

    

    </>
  );
}