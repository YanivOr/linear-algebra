class InfoLayout {
    constructor() {
        this.createAxes()
        this.createText()
    }
 
    createAxes = () => {
        ctx.beginPath()
        ctx.strokeStyle = '#ff000077'
        ctx.moveTo(c.width / 2, 0)
        ctx.lineTo(c.width / 2, c.height)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = '#0000ff77'
        ctx.moveTo(0, c.height / 2)
        ctx.lineTo(c.width, c.height / 2)
        ctx.stroke()
        ctx.closePath()
    }

    createText = () => {
        const axis = [c.width / 2, c.height / 2]
        const margin = 15
        let cntr

        ctx.beginPath()
        ctx.strokeStyle = '#999999'
        ctx.font = '30px Arial'
        ctx.strokeText('Linear Algebra', 10, 50)

        ctx.beginPath()
        ctx.fillStyle = '#ffffff66'
        ctx.font = '15px Arial'

        cntr = 0
        for(let x=axis[0];x<c.width;x+=40) {
            ctx.fillText(cntr, x, c.height / 2 + margin)
            cntr++
        }

        cntr = 1
        for(let x=axis[0] + 40;x>0;x-=40) {
            ctx.fillText(cntr, x, c.height / 2 + margin)
            cntr--
        }

        cntr = -1
        for(let y=axis[1] + 40;y<c.height;y+=40) {
            ctx.fillText(cntr, c.width / 2 - margin, y)
            cntr--
        }

        cntr = 1
        for(let y=axis[1] - 40;y>0;y-=40) {
            ctx.fillText(cntr, c.width / 2 - margin, y)
            cntr++
        }

        ctx.closePath()
    }
}