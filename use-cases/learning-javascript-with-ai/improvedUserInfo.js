const user = {
    name: "Sepape",
    age: 30
};

function greetUser(user) {
    console.log(`Welcome ${user.name}!`);

    if (user.age >= 18) {
        console.log("You are an adult.");
    } else {
        console.log("You are a minor.");
    }
}

greetUser(user);