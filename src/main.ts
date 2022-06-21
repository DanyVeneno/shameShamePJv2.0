import { v4 } from 'uuid'

import Toastify from 'toastify-js'


import "toastify-js/src/toastify.css"
import './style.css'


const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const tasksList = document.querySelector<HTMLDivElement>('#tasksList')

// albumTitle:string
interface task{
    id:string
    title:string
   
    description:string
}
let tasks: task []=[]

taskForm?.addEventListener('submit', e =>{
    e.preventDefault()

   const title = taskForm['title']as unknown as HTMLInputElement
   const description = taskForm['description']as unknown as HTMLTextAreaElement

   //console.log(title.value)
  // console.log(description.value)
////albumTitle:albumTitle.value,
    tasks.push({
        title:title.value,
        
        description:description.value,
        id:v4()
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))



    Toastify({
        text:"Task added",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },

    }).showToast();


    renderTasks(tasks)

    //auto reset
    taskForm.reset()
    //blink
    title.focus()
})

document.addEventListener('DOMContentLoaded',()=>{

   tasks = JSON.parse(localStorage.getItem('tasks') || '[]')

   renderTasks(tasks)
    //console.log('cargado')
})

function renderTasks(tasks: task[]){


    tasksList!.innerHTML = ''

    tasks.forEach(task =>{
        const taskElement = document.createElement('div')
        taskElement.className = 'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-slate-600 hover:cursor-pointer'

        const header = document.createElement('header')
        header.className = 'flex justify-between'
        const title = document.createElement('span')
        title.innerText = task.title

        const btnDelete = document.createElement('button')
        btnDelete.className = 'bg-stone-500 px-2 py-1 rounded-md'
        btnDelete.innerText = 'Delete'

        btnDelete.addEventListener('click', () =>{

            const index = tasks.findIndex(t => t.id === task.id)
            tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            renderTasks(tasks)

        })


        header.append(title)
        header.append(btnDelete)

        const description = document.createElement('p')
        description.innerText = task.description

       
        taskElement.append(header)
        taskElement.append(description)
        tasksList?.append(taskElement)

    })

}