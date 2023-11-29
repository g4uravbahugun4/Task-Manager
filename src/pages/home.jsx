import React, { useState, useEffect } from 'react';
import TaskCard from '../Components/TaskCard';
import Icons from '../svgs/icons';
import { NewTask } from '../modal/NewTask';


function Home() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState('priority'); // Default sorting option

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed!');
      const updatedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      console.log('Updated tasks:', updatedTasks);
      setTasks(updatedTasks);
    };

    handleStorageChange();

    window.addEventListener('storageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storageUpdate', handleStorageChange);
    };
  }, []);

  const sortTasks = (option) => {
    if (option === 'priority') {
      return tasks.slice().sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    } else if (option === 'date') {
      return tasks.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  
  };

  const sortedTasks = sortTasks(sortOption);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <>
      <div className='flex gap-2 justify-center m-2 p-4'>
        <h1 className='text-black font-black font-serif text-3xl text-center m-3'>Task Manager</h1>
        <div className='cursor-pointer' onClick={handleOpen}>{Icons.addIcon}</div>
      </div>

      <div class="relative h-10 m-auto w-72 min-w-[200px]">
        <select
          value={sortOption}
          onChange={handleSortChange}
          class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        >
          <option className='p-2' value="priority">Priority</option>
          <option className='p-2' value="date">Date Added</option>
        </select>
        <label
          class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        >
          Sort Tasks
        </label>
      </div>

      <div className='rounded-md flex flex-wrap gap-3 p-2 m-2 sm:p-5 sm:m-5 sm:rounded-md bg-[#ecedec]'>
        {sortedTasks.map((task, index) => (
          <TaskCard key={index} id={task.id} name={task.name} description={task.description} priority={task.priority} date={task.date} status={task.status} />
        ))}
      </div>

      <NewTask open={open} setOpen={setOpen} />
    </>
  );
}

export default Home;
