const allCheckBox = document.querySelectorAll(".checkbox");
const allInputFields = document.querySelectorAll(".goal-input");
const progressError = document.querySelector(".progress-error");

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allInputFilled = [...allInputFields].every((input) => {
      return input.value;
    });

    if (allInputFilled) {
      checkbox.parentElement.classList.toggle("completed");
    } else {
      progressError.classList.add("error-show");
    }
  });
});

allInputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    progressError.classList.remove("error-show");
  });
});
