import { h, component } from './lib.js';

const TASKS = [
  { "title": "task 1", "done": false },
  { "title": "task 2", "done": false }
];

const button = component((props, children) => {
  return h('button', props, children);
});

const taskItem = component((props, children, rerender) => {
  let done = props.task.done;

  function toggle() {
    done = !done;
  }

  return h('div', { class: 'task-item' , id: props.task.title}, [   
     h('label', {for:`done-${props.index}`}, [props.task.title]),
    h('input', { type: 'checkbox', onclick: toggle, name: `done-${props.index}`,  value: done ? true : '',}),
    button({ onclick: () => props.onTaskDeleted(props.task) }, "Delete")
  ]);
});

const taskList = component((props) => {
  function handleTaskDeleted(task) {
    const index =TASKS.findIndex(t=> t.title===task.title); 
    TASKS.splice(index,1);
    document.getElementById(task.title).remove();
  }

  const taskItems = props.tasks.map((task , index )=> {
    return taskItem({ task: task, onTaskDeleted: handleTaskDeleted,  index });
  });

  return h('div', { class: 'task-list' }, taskItems);
});

const addTaskForm = component((props) => {
  function handleSubmit(event) {
    event.preventDefault();
    const task = {
      title: event.target.elements.title.value,
      done: false
    };
    props.onTaskCreated(task);
  }

  return h('form', { onsubmit: handleSubmit, class: 'add-task-form'  }, [
    h('input', { type: 'text', placeholder: 'Task title', name: 'title' , class: 'add-task-input' }),
    button({ type: 'submit', class: 'add-task-button' }, 'Add')
  ]);
});

const app = component((props, children, rerender) => {
  const tasks = TASKS;

  function handleTaskCreated(task) {
    if(task.title){
        tasks.push(task);
        rerender();
    }
  }

  return h('div', { id: 'app' }, [
    taskList({ tasks: tasks }),
    addTaskForm({ onTaskCreated: handleTaskCreated })
  ]);
});

document.addEventListener('DOMContentLoaded', () => document.body.appendChild(app()));
