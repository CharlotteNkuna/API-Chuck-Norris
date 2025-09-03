console.clear();

const displayJoke = document.getElementById("display-joke");
const category = document.getElementById("category");
let chosenCategory = `dev`;

category.addEventListener("change", () => {
  chosenCategory = category.value;
});

async function generateCategoryOptions() {
  let outPut = ``;

  try {
    const results = await fetch(`https://api.chucknorris.io/jokes/categories`);

    if (!results.ok) {
      throw new Error("Request failed.");
    }

    const data = await results.json();

    category.removeAttribute("disabled");

    data.forEach((category) => {
      outPut += `<option value="${category}">${category}</option>`;
    });

    category.innerHTML = outPut;
    category[3].selected = true;
  } catch {
    console.error(error);
  }
}
generateCategoryOptions();

async function fetchJoke() {
  const errorMessage = `"DO NOT DISTURB!" Chuck Norris is currently entertaining guests in his hotel room.`;

  try {
    const results = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${chosenCategory}`
    );

    if (!results.ok) {
      displayJoke.textContent = errorMessage;
      throw new Error("Request failed.");
    }

    const data = await results.json();
    displayJoke.textContent = data.value;
    //console.log(data.value); //data
    console.log(data); //objects
  } catch (error) {
    displayJoke.textContent = errorMessage;
    console.error(error);
  }
}

//dashboard

const user = JSON.parse(localStorage.getItem("loggedInUser"));

//IF STATEMENT: Condition to make the page(dashboard) private and be only accessible if a user is logged in.
if (!user) {
  //! means NOT - if no user found then go to login page
  //Redirect to login - to go to the login page autometically if cant find user
  window.location.href = "login.html";
} else {
  //if logins are true
  document.getElementById("welcome").innerText = "Hello " + user.username; //using innertext as a setter   getElementbyID is a getter
  // //we are telling the innertext to send info to. function fetches user from local storage
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}); // event listener works when you "click" button and it works . its for the input
//when you click it, it deletes the info and you will logout successfully.
