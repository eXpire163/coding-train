let input, button, greeting;

function setup() {
    // create canvas
    createCanvas(420, 420);
    colorMode(HSB)

    inputN = createInput();
    inputN.position(20, 65);
    inputF = createInput();
    inputF.position(20, 95);


    button = createButton('submit');
    button.position(inputN.x + inputN.width, 65);
    button.mousePressed(greet);

    textAlign(CENTER);
    textSize(50);
    inputN.value('LOGO');
    inputF.value(2);
    greet();
}

function greet() {
    background(51, 20, 2);
    textAlign(CENTER);
    textSize(50);
    const name = inputN.value();
    const fSize = inputF.value();
    nameColor = nameToNumber(name) % 255;

    for (let i = 0; i < 150; i++) {
        push();
        let r = random(155, i)
        fill(nameColor, r, r);
        translate(random(width), random(height));
        rotate(random(2 * PI));
        text(name, 0, 0);
        pop();
    }
    fill(255, 0, 255);
    strokeWeight(4);
    stroke(0, 0, 0)
    textSize(width / fSize);
    textAlign(CENTER, CENTER);
    text(name, width / 2, height / 2);
}

function nameToNumber(name) {
    // Initialize a variable to hold the final number
    let num = 0;

    // Loop through each character in the name
    for (let i = 0; i < name.length; i++) {
        // Convert the character to a number using its ASCII value
        // and add it to the final number
        num += name.charCodeAt(i);
    }

    // Return the final number
    return num;
}
