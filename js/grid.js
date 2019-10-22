class Grid {
    constructor() {
        this.createGrid()
    }

    createGrid = () => {
        const axis = [c.width / 2, c.height / 2]

        ctx.lineWidth = 1
        
        ctx.beginPath()
        ctx.strokeStyle = '#222222'

        for(let x=axis[0];x<c.width;x+=20) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, c.height)
        }

        for(let x=axis[0];x>0;x-=20) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, c.height)
        }

        for(let y=axis[1];y<c.height;y+=20) {
            ctx.moveTo(0, y)
            ctx.lineTo(c.width, y)
        }

        for(let y=axis[1];y>0;y-=20) {
            ctx.moveTo(0, y)
            ctx.lineTo(c.width, y)
        }
        
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.strokeStyle = '#333333'
        
        for(let x=axis[0];x<c.width;x+=40) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, c.height)
        }

        for(let x=axis[0];x>0;x-=40) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, c.height)
        }

        for(let y=axis[1];y<c.height;y+=40) {
            ctx.moveTo(0, y)
            ctx.lineTo(c.width, y)
        }

        for(let y=axis[1];y>0;y-=40) {
            ctx.moveTo(0, y)
            ctx.lineTo(c.width, y)
        }

        ctx.stroke()
        ctx.closePath()
    }
}