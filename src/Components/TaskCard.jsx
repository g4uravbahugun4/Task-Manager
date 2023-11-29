import React, { useState } from 'react';

import { TaskView } from '../modal/TaskView';


function TaskCard({name,description,date,priority,id,status}) {

  const [isChecked, setIsChecked] = useState(() => status === 'complete');


  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(!open);



const handleCheckboxChange = () => {
  setIsChecked((prevIsChecked) => !prevIsChecked);

  // Update the status in local storage based on the checkbox state
  const taskData = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTaskData = taskData.map((task) =>
    task.id === id ? { ...task, status: !isChecked ? 'complete' : 'incomplete' } : task
  );
  localStorage.setItem('tasks', JSON.stringify(updatedTaskData));
  const storageUpdateEvent = new Event('storageUpdate');
  window.dispatchEvent(storageUpdateEvent);
};


  return (
    <div className="p-2 w-[30%] shadow-md bg-white rounded-md cursor-pointer m-4 hover:scale-105" onClick={handleOpen }>
    <h1 className={`ml-2 font-bold text-[#4d4f50] text-xl ${status === 'complete' ? 'line-through' : ''}`}>{name}</h1>
      <h2 className="ml-2 font-medium text-sm text-[#a7abae]">{date}</h2>
      
     {priority==='Medium' ?<span className={`m-2 p-2 bg-[#fae4d6] text-orange-600 rounded-md text-xs ${status==='complete'?'line-through':''}`}>Medium</span>:
      priority==="Low"?<span className={`ml-3 bg-[#d8fad6] text-green-600 rounded-md text-xs p-2 ${status==='complete'?'line-through':''}`}>Low</span>:
      <span className={`ml-3 bg-[#fad6d6] text-red-600 rounded-md text-xs p-2 ${status==='complete'?'line-through':''}`}>High</span>
     }

      {status==='complete' ? (
        <span className={`flex justify-center p-2 m-2 items-center text-green-100 bg-green-700 text-xs font-semibold rounded-full`}>
          <span>Completed</span>
        </span>
      ) : (
        <span className={`flex justify-center p-2 m-2 items-center text-red-100 font-semibold bg-red-600 text-xs  rounded-full`}>
          <span>Incomplete</span>
        </span>
      )}

        <div className="flex items-center m-2 mt-6" onClick={(event) => event.stopPropagation()}>
        <input
          id={id}
          type="checkbox"
          value=""
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2"
        />
        <label htmlFor={id} className="ms-2 text-xs font-medium text-[#707374]">
          Mark As Complete
        </label>
      </div>
          
      <TaskView open={open} setOpen={setOpen} name={name} date={date} description={description} priority={priority} id={id} status={status}/>

    </div>
    
  );


}

export default TaskCard;
