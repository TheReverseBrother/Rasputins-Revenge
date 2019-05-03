class StaticObject {
    constructor(width, height,posX, posY,ImgSrc,cells)
    {
        this.width = width;
        this.height = height;
        this.x = posX;
        this.y = posY;
        this.ImgSrc = ImgSrc;
        this.cell = cells[0];
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.cell;
        this. visible = true;
    }

    Draw(context)
    {
        if(this.visible === true)
        {
            context.drawImage(this.ImgSrc,this.cell.SPRITE_X,
                this.cell.SPRITE_Y, this.cell.SPRITE_WIDTH,
                this.cell.SPRITE_HEIGHT,this.x,this.y,this.width,this.height);
        }
        //Debugging Collision just let this run
        // context.fillRect(this.x,this.y,this.width,this.height);
    }
    /*
     * This takes in another object of one of these three crashes and makes sure it is not touching or in the current object
     */
    checkCrash(OtherObject)
    {
        var temp = null;
        this.thisleft = this.x;
        this.thisright = this.x + (this.width);
        this.thistop = this.y;
        this.thisbottom = this.y + (this.height);
        this.otherleft = OtherObject.returnPositionX();
        temp = OtherObject.returnWidth();
        this.otherright = OtherObject.returnPositionX() +  temp;
        this.othertop = OtherObject.returnPositionY();
        temp = OtherObject.returnHeight();
        this.otherbottom = OtherObject.returnPositionY() + temp;
        this.hascrash = true;
        if ((this.thisbottom < this.othertop) || (this.thistop > this.otherbottom) || (this.thisright < this.otherleft) || (this.thisleft > this.otherright))
        {
            this.hascrash = false;
        }
        if(!OtherObject.getVisible())
        {
            this.hascrash = false;
        }
        return this.hascrash;
    }

    gravityBehaviour()
    {
        this.gravitySpeed += this.gravity;
        this.y += this.gravitySpeed;
    }
    getVisible()
    {
        return this.visible;
    }

    setVisible()
    {
        this.visible = true;
    }
    setInVisible()
    {
        this.visible = false;
    }
    returnHeight()
    {
        return this.height;
    }
    updatePositionY(value)
    {
        this.y += value;
    }
    updatePositionX(value)
    {
        this.x += value;
    }
    returnPositionX()
    {
        return this.x;
    }
    returnPositionY()
    {
        return this.y;
    }
    returnWidth()
    {
        return this.width;
    }
}


class AnimatedObject
{
    constructor(Image,cells,posX,posY,width,height,delay)
    {
        this.ImgSrc = Image;
        this.cells = cells;
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.delay = delay;
        this.counter = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.visible = true;
        this.cellIndex = 1;
    }

    render(context)
    {
        if(this.visible === true)
        {
            this.cell = this.cells[this.cellIndex];

            context.drawImage(this.ImgSrc, this.cell.SPRITE_X,
                this.cell.SPRITE_Y, this.cell.SPRITE_WIDTH,
                this.cell.SPRITE_HEIGHT , this.x, this.y, this.width, this.height);
            this.advance();
        }
        // context.fillRect(20,30,30,30);
    }
    
    advance()
    {
        this.counter++;
        let z = this.counter % this.delay;
        if(z === 0)
        {
            if (this.cellIndex === this.cells.length-1)
            {
                this.cellIndex = 0;
            }
            else {
                this.cellIndex++;
                this.counter = 0;
            }
        }
    }

    checkCrash(OtherObject)
    {
        var temp = null;
        this.thisleft = this.x;
        this.thisright = this.x + (this.width);
        this.thistop = this.y;
        this.thisbottom = this.y + (this.height);
        this.otherleft = OtherObject.returnPositionX();
        temp = OtherObject.returnWidth();
        this.otherright = OtherObject.returnPositionX() +  temp;
        this.othertop = OtherObject.returnPositionY();
        temp = OtherObject.returnHeight();
        this.otherbottom = OtherObject.returnPositionY() + temp;
        this.hascrash = true;
        if ((this.thisbottom < this.othertop) || (this.thistop > this.otherbottom) || (this.thisright < this.otherleft) || (this.thisleft > this.otherright))
        {
            this.hascrash = false;
        }
        if(!OtherObject.getVisible())
        {
            this.hascrash = false;
        }
        return this.hascrash;
    }

    gravityBehaviour()
    {
        this.gravitySpeed += this.gravity;
        this.y += this.gravitySpeed;
    }
    updatePosX(value)
    {
        this.x += value;
    }
    setInVisible()
    {
        this.visible = false;
    }
    getVisible()
    {
        return this.visible;
    }
}
