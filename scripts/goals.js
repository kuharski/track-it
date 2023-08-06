// initial references
const newGoalInput = document.querySelector('#new-goal input');
const goalsDiv = document.getElementById('goals');
let deleteGoals, editGoals, Goals;
let updateNote = '';
let count;

// function on window load
window.onload = () => {
  updateNote = '';
  count = Object.keys(localStorage).length;
  displayGoals();
};

//function to display the goals
const displayGoals = () => {
  if(Object.keys(localStorage).length > 0){
    goalsDiv.style.display = "inline-block";
  } else {
    goalsDiv.style.display = "none";
  }

  //clear goals
  goalsDiv.innerHTML = '';

  //fetch local storage keys
  let goals = Object.keys(localStorage);
  goals = goals.sort();

  for(let key of goals) {
    let classValue= '';
    if(key == 'recent-workout-entries') {
      continue;
    }
    //get values
    let value = localStorage.getItem(key);
    let goalInnerDiv = document.createElement('div');
    goalInnerDiv.classList.add('goal', 'py-1', 'px-3', 'm-3', 'flex', 'items-center', 'border-b-2', 'border-gray-300');
    goalInnerDiv.setAttribute('id', key);

    goalInnerDiv.innerHTML = `<span id="goalname" class="font-normal overflow-hidden mr-2">
    ${key.split('_')[1]}</span>`;
    //local storage stores boolean as string -> parse it back to boolean
    let editButton = document.createElement('button');
    editButton.classList.add('edit', 'p-2', 'rounded-xl', 'font-semibold','hover:bg-slate-300', 'ml-auto', 'mr-4');
    editButton.innerHTML = `Edit`;
    if(!JSON.parse(value)) {
      editButton.style.visibility = 'visible';
    } else {
      editButton.style.visibility = 'hidden';
      goalInnerDiv.classList.add('completed'); //might be problem
    }

    goalInnerDiv.appendChild(editButton);
    goalInnerDiv.innerHTML += `<button class="delete p-2 text-red-800 hover:bg-red-200 rounded-xl font-semibold">Delete</button>`;
    goalsDiv.appendChild(goalInnerDiv);
  }

  // - look at functionality
  // goals = completed;
  // goals = document.querySelectorAll('.goal');
  // goals.forEach((element, index) => {
  //   element.onclick = () => {
  //     //local storage update
  //     if(element.classList.contains('completed')) {
  //       updateStorage(element.id.split('_')[0],
  //       element.innerText, false);
  //     } else {
  //       updateStorage(element.id.split('_')[0],
  //       element.innerText, true);
  //     }
  //   };
  // });

  //edit goals
  editGoals = document.getElementsByClassName('edit');
  Array.from(editGoals).forEach((element,index) => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      //disable other edit buttons
      disableButtons(true);
      // update input value remove div
      let parent = element.parentElement;
      newGoalInput.value = parent.querySelector('#goalname').innerText;
      //set updatenote to task thats being edited
      updateNote = parent.id;
      //remove goal
      parent.remove();
    });
  });

  //delete goals
  deleteGoals = document.getElementsByClassName('delete');
  Array.from(deleteGoals).forEach((element, index) => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      //delete local storage remove div
      let parent = element.parentElement;
      removeGoal(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

//disable edit button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName('edit');
  Array.from(editButtons).forEach(element => {
    element.disabled = bool;
  })
};

//remove goal from local storage
const removeGoal = (goalValue) => {
  localStorage.removeItem(goalValue);
  displayGoals;
};

//add to local storage
const updateStorage = (index,goalValue,completed) => {

  localStorage.setItem(`${index}_${goalValue}`, completed);
  displayGoals();
}

// function to add new goal
document.getElementById('push').addEventListener('click', () => {
  //enable edit button
  disableButtons(false);
  if(newGoalInput.value.length == 0) {
    alert("Please Enter A Goal!");
  } else {
    //store locally and display from storage
    if(updateNote=='') {
      //new goal
      updateStorage(count, newGoalInput.value, false);
    } else {
      //update goal
      let existingCount = updateNote.split('_')[0];
      removeGoal(updateNote);
      updateStorage(existingCount,newGoalInput.value, false);
      updateNote = '';
    }
    count += 1;
    newGoalInput.value = '';
  }
});