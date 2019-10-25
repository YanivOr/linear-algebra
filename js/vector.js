class Vector {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;

        this.draw();
    }

    createVector = () => {
        const srcX = c.width / 2;
        const srcY = c.height /  2;

        this.dstX = srcX + this.x * 40;
        this.dstY = srcY + -this.y * 40;
    
        ctx.beginPath();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.moveTo(srcX, srcY);
        ctx.lineTo(this.dstX, this.dstY);
        ctx.stroke();
        ctx.closePath();
    }

    createJoint = () => {
        ctx.beginPath();
        ctx.moveTo(this.dstX, this.dstY);
        ctx.arc(this.dstX, this.dstY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffa500';
        ctx.fill();
        ctx.closePath();
    }
    
    createText = () => {
        ctx.beginPath();
        ctx.font = '17px Arial';
        ctx.fillStyle = '#999999';
        ctx.fillText(`${this.name} (${this.x}, ${this.y})`, this.dstX + 10, this.dstY);
        ctx.closePath();
    }

    draw = () => {
        this.createVector();
        this.createJoint();
        this.createText();
    }
}
