(async () => {
    const canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    const colors = [
        "AliceBlue",
        "AntiqueWhite",
        "Aqua",        "DarkSlateBlue",
        "DarkSlateGray",
        "DarkSlateGrey",
        "DarkTurquoise",
        "DarkViolet",
        "DeepPink",
        "DeepSkyBlue",
        "DimGray",
        "DimGrey",
        "DodgerBlue",      "HotPink",
        "IndianRed",
        "Indigo",
        "Ivory",
        "Khaki",
        "Lavender",
        "LavenderBlush",
        "LawnGreen",
        "LemonChiffon",
        "LightBlue",
        "LightCoral",
        "LightCyan",
        "LightGoldenRodYellow",
        "LightGray",
        "LightGrey",
        "LightGreen",
        "LightPink",
        "LightSalmon",
        "LightSeaGreen",
        "LightSkyBlue",
        "LightSlateGray",
        "LightSlateGrey",
        "LightSteelBlue",
        "LightYellow",
        "Lime",
        "LimeGreen",
        "Linen",
        "Magenta",
        "Maroon",
        "MediumAquaMarine",
        "MediumBlue",
        "MediumOrchid",
        "MediumPurple",
        "MediumSeaGreen",
        "MediumSlateBlue",
        "MediumSpringGreen",
        "MediumTurquoise",
        "MediumVioletRed",
        "MidnightBlue",
        "MintCream",
        "MistyRose",
        "Moccasin",
        "NavajoWhite",
        "Navy",
        "OldLace",
        "Olive",
        "OliveDrab",
        "Orange",
        "OrangeRed",
        "Orchid",
        "PaleGoldenRod",
        "PaleGreen",
        "PaleTurquoise",
        "PaleVioletRed",
        "PapayaWhip",
        "PeachPuff",
        "Peru",
        "Pink",
        "Plum",
        "PowderBlue",
        "Purple",
        "RebeccaPurple",
        "Red",
        "RosyBrown",
        "RoyalBlue",
        "SaddleBrown",
        "Salmon",
        "SandyBrown",
        "SeaGreen",
        "SeaShell",
        "Sienna",
        "Silver",
        "SkyBlue",
        "SlateBlue",
        "SlateGray",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "SlateGrey",
        "Snow",
        "SpringGreen",
        "SteelBlue",
        "Tan",
        "Tan",
        "Tan",
        "Tan",
        "Tan",
        "Tan",
        "Tan",
        "Tan",
        "Tan",
        "Teal",
        "Thistle",
        "Tomato",
        "Turquoise",
        "Violet",
        "Wheat",
        "White",
        "WhiteSmoke",
        "Yellow",
        "YellowGreen",
    ];

    let font_size = 26
    let cube_per_line = 11;
    let x_position = 0;
    let y_position = 0;

  async  function init() {
       await setBackgroud("background.jpg", 0, 0)
        for (let i = 0; i < colors.length; i++) {
            const ret = draw_cube(i);
            if (ret == 0) break;
        }

    }

    function draw_cube(i) {
        const width = canvas.scrollWidth / cube_per_line
        if ((i % cube_per_line === 0) && i !== 0) { y_position = y_position + width; x_position = 0; }
        ctx.beginPath();
        ctx.rect(x_position, y_position, width, width);
        ctx.beginPath();
        ctx.rect(x_position + (width / 4), y_position + (width / 4), width / 1.7, width / 1.7);
        ctx.stroke();
        ctx.fillStyle = colors[i];
        ctx.fill();

        ctx.shadowColor = '#898';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;


        ctx.closePath();
        const rgb = colorToRGBA(colors[i])
        const brightness = Math.round(((parseInt(rgb[0]) * 299) +
            (parseInt(rgb[1]) * 587) +
            (parseInt(rgb[2]) * 114)) / 1000);
        const textColour = (brightness > 125) ? 'black' : 'white';


        ctx.fillStyle = textColour;
        ctx.font = `${font_size}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(i, x_position + (width / 1.85), (y_position + width) - (width / 2.8));

        x_position = x_position + width;
        if (y_position >= canvas.scrollWidth) {
            console.log("limit reached")
            ctx.clearRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
            cube_per_line = cube_per_line + 1;
            font_size = font_size - 1
            y_position = 0;
            x_position = 0;
            init()
            return 0;
        }
        return 1;
    }
    init();



    function setBackgroud(img, x, y) {
    return new Promise((resolve, reject) => {
        base_image = new Image()
        base_image.src = img;
        base_image.onload = function () {
            ctx.drawImage(base_image, x, y, 1280, 1280);
            resolve()
        }
    }) 
    }

    function colorToRGBA(color) {
        var cvs, ctx;
        cvs = document.createElement('canvas');
        cvs.height = 1;
        cvs.width = 1;
        ctx = cvs.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
    }

})()
