let result;

{
    // Private things
    const privateThing = 1;
    const privateString = "Hello world";
    // Public things
    result = function () {
        return [privateThing, privateString];
    }
}

let r = result();
console.log(r);
console.log(privateThing);
