class ColorPallete {

    /**
     * 
     * @param {String} id
     * @param {String} background
     * @param {Array<String>} colors 
     */
    constructor(id, background, colors, ) {
        this.id = id;
        this.background = background;
        this.colors = colors;
        this.canvas = document.getElementById(this.id);
        this.ctx = this.canvas.getContext('2d');

        this.font_size = 26
        this.cube_per_line = 11;
        this.x_position = 0;
        this.y_position = 0;
    }

    async init() {

        await this.setBackgroud(this.background, 0, 0).catch(error => {
            console.error(error)
        })
        for (let i = 0; i < this.colors.length; i++) {
            const ret = this.draw_cube(i);
            if (ret == 0) break;
        }
        return this;
    }

    draw_cube(i) {
        const width = this.canvas.scrollWidth / this.cube_per_line
        if ((i % this.cube_per_line === 0) && i !== 0) {
            this.y_position = this.y_position + width;
            this.x_position = 0;
        }
        this.ctx.beginPath();
        this.ctx.rect(this.x_position, this.y_position, width, width);
        this.ctx.beginPath();
        this.ctx.rect(this.x_position + (width / 4), this.y_position + (width / 4), width / 1.7, width / 1.7);
        this.ctx.stroke();
        this.ctx.fillStyle = this.colors[i];
        this.ctx.fill();

        this.ctx.shadowColor = '#898';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;


        this.ctx.closePath();
        const rgb = this.colorToRGBA(this.colors[i])
        const brightness = Math.round(((parseInt(rgb[0]) * 299) +
            (parseInt(rgb[1]) * 587) +
            (parseInt(rgb[2]) * 114)) / 1000);
        const textColour = (brightness > 125) ? 'black' : 'white';


        this.ctx.fillStyle = textColour;
        this.ctx.font = `${this.font_size}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.fillText(i, this.x_position + (width / 1.85), (this.y_position + width) - (width / 2.8));

        this.x_position = this.x_position + width;
        if (this.y_position >= this.canvas.scrollWidth) {
            console.log("limit reached")
            this.ctx.clearRect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
            this.cube_per_line = this.cube_per_line + 1;
            this.font_size = this.font_size - 1
            this.y_position = 0;
            this.x_position = 0;
            this.init()
            return 0;
        }
        return 1;
    }
    async setBackgroud(img, x, y) {
        return new Promise((resolve, reject) => {
            let base_image = new Image()
            base_image.src = img;
            const ctx = this.ctx;
            base_image.onload = function () {
                ctx.drawImage(base_image, x, y, 1280, 1280);
                resolve()
            }
            base_image.onerror = function () {
                reject("I cant find the background")
            }
        })
    }
    colorToRGBA(color) {
        var cvs, ctx;
        cvs = document.createElement('canvas');
        cvs.height = 1;
        cvs.width = 1;
        ctx = cvs.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        return ctx.getImageData(0, 0, 1, 1).data;
    }
}


new ColorPallete("myCanvas", "background.jpg", colors).init();