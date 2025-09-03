console.clear();

const displayJoke = document.getElementById("display-joke"); 
const category = document.getElementById("category");
let chosenCategory = `dev`; //default category

category.addEventListener("change", () => {
	chosenCategory = category.value;
});

async function generateCategoryOptions() {
	let outPut = ``;

	try {
		const results = await fetch(`https://api.chucknorris.io/jokes/categories`); //get method. fetch is a bulit in method 
		//fetch is a keyword for requesting API.

		if (!results.ok) { //if not results. //if results are not okay it must say. ! = not ok=successful
			throw new Error("Request failed.");
		}

		const data = await results.json(); // await: waits for results to be loaded. .json: convert the results to json

		category.removeAttribute("disabled");

		data.forEach((category) => { //
			outPut += `<option value="${category}">${category}</option>`; //setting values to category in options
		});

		category.innerHTML = outPut;
		category[3].selected = true; //[3] put this one as a default if the person doesnt click on the category
	} catch { //use try catch if you dont know if you will be getting the positive results. - there wont be errors to crash the app
		//if it doesnt work you get error //catch you tell it what it should say
		console.error(error);
	}
}
generateCategoryOptions();

async function fetchJoke() {
	const errorMessage = `"DO NOT DISTURB!" Chuck Norris is currently entertaining guests in his hotel room.`;

	try {
		const results = await fetch( // awaif for info to come, thn move together- async
			`https://api.chucknorris.io/jokes/random?category=${chosenCategory}` //choosecategory - used for searching or for writing items by name/sorting
		);

		if (!results.ok) {
			displayJoke.textContent = errorMessage;
			throw new Error("Request failed.");
		}
//otherwise
		const data = await results.json(); 
		displayJoke.textContent = data.value;
		console.log(data.value);
	} catch (error) {
		displayJoke.textContent = errorMessage;
		console.error(error);
	}
}