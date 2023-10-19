const formOne = document.getElementById("form-one");
const formTwo = document.getElementById("form-two");

const regexEmail = /^[\w\.-]+@[\w\.-]+\.\w+$/;
let userEmail = "";

let events = {
  buttonReset: undefined,
  submitFormTwo: undefined,
};

listenFormOne();

function listenFormOne() {
  const inputEmail = document.getElementById("input-email");
  const buttonValidateEmail = document.getElementById("validate-email");

  //Listen input email
  inputEmail.addEventListener("input", () => {
    buttonValidateEmail.disabled = !regexEmail.test(inputEmail.value);
    userEmail = inputEmail.value;
  });

  //Listen submit form
  formOne.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!userEmail) {
      alert("Por favor insira um e-mail");
      return;
    }

    fetchApi()
      .then((data) => {
        listenFormTwo(data);
      })
      .catch((e) => {
        alert("algo dá errado");
        console.error(e);
      });
  });
}

function listenFormTwo(data) {
  const inputConfirmEmail = document.getElementById("input-confirm-email");
  const buttonReset = document.getElementById("reset");
  const countTag = document.getElementById("tag-count");
  formOne.classList.add("d-none");
  formTwo.classList.remove("d-none");

  inputConfirmEmail.value = userEmail;

  countTag.innerText = data;

  events.submitFormTwo = (event) => {
    event.preventDefault();

    fetchApi()
      .then(() => {
        alert(`Redirect: Create acc: ${userEmail}`);
      })
      .catch((e) => {
        alert("algo dá errado");
        console.error(e);
      });
  };

  formTwo.addEventListener("submit", events.submitFormTwo);

  events.buttonReset = reset;
  buttonReset.addEventListener("click", events.buttonReset);
}

/** UTILS */
function fetchApi() {
  loading();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Supongamos que acá tendríamos una solicitud real de Fetch
      resolve(10);
      loading(false);
    }, 1000);
  });
}

function loading(show = true) {
  const loadingContainer = document.getElementById("spinner");
  show
    ? loadingContainer.classList.remove("invisible")
    : loadingContainer.classList.add("invisible");
}

function reset() {
  const buttonReset = document.getElementById("reset");
  formOne.classList.remove("d-none");
  formTwo.classList.add("d-none");

  buttonReset.removeEventListener("click", events.buttonReset);
  formTwo.removeEventListener("submit", events.submitFormTwo);
}
