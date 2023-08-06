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
    goalInnerDiv.classList.add('goal');
    goalInnerDiv.setAttribute('id', key);
    goalInnerDiv.innerHTML = `<span id="goalname">
    ${key.split('_')[1]}</span>`;
    //local storage stores boolean as string -> parse it back to boolean
    let editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.innerHTML = `EDIT`; //cant use font awesome no more
    if(!JSON.parse(value)) {
      editButton.style.visibility = 'visible';
    } else {
      editButton.style.visibility = 'hidden';
      goalInnerDiv.classList.add('completed');
    }

    goalInnerDiv.appendChild(editButton);
    goalInnerDiv.innerHTML += `<button class="delete">DELETE</button>`;
    goalsDiv.appendChild(goalInnerDiv);

  }

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