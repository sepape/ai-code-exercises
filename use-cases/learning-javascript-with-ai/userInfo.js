// Store the user's information
const name = "Sepape";
const age = 30;

// Function to greet the user
function greetUser(name) {
    return `Welcome ${name}!`;
}

// Display the greeting
console.log(greetUser(name));

// Check the user's age
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}