const allCheckBox = document.querySelectorAll(".checkbox");
const allInputFields = document.querySelectorAll(".goal-input");
const progressError = document.querySelector(".progress-error");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa!  You just completed your all goal, time for chill :D",
];

const allGoals =
  JSON.parse(localStorage.getItem("allGoals")) ||
  {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${(completedGoalsCount / allInputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${allInputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allInputFilled = [...allInputFields].every((input) => {
      return input.value;
    });

    if (allInputFilled) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount / allInputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${(completedGoalsCount)} / ${allInputFields.length} completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressError.classList.add("error-show");
    }
  });
});

allInputFields.forEach((input) => {
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressError.classList.remove("error-show");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      };
    }
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
