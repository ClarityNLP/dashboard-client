const colors = [];

for (let i = 0; i < 100; i++) {
    let color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    if (color.length < 7) {
        for (let i = color.length; i < 7; i++) {
            color += "0";
        }
    }

    colors.push(color);
}

export default colors;
