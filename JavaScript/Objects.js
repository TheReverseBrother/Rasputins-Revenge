class StaticObject {
    width;
    height;
    x;
    y;
    ImgSrc;
    Sprite_X;
    Sprite_Y;
    Sprite_Width;
    Sprite_Height;
    visible = true;
    constructor(width, height,posX, posY,ImgSrc,Sprite_X,Sprite_Y,Sprite_Width,Sprite_Height)
    {
        this.width = width;
        this.height = height;
        this.x = posX;
        this.y = posY;
        this.ImgSrc = ImgSrc;
        this.Sprite_X = Sprite_X;
        this.Sprite_Y = Sprite_Y;
        this.Sprite_Width = Sprite_Width;
        this.Sprite_Height = Sprite_Height;
    }

    Draw(context)
    {
        if(this.visible === true)
        {
            context.drawImage(this.ImgSrc,this.Sprite_X,this.Sprite_Y,this.Sprite_Width,
                this.Sprite_Height,this.x,this.y,this.width,this.height);
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
        //Former Collision detection mainly works but even then
        // if (this.x < (OtherObject.returnPositionX() + OtherObject.returnWidth()) &&
        //     (this.x + this.width) > OtherObject.returnPositionY() &&
        //     this.y < (OtherObject.returnPositionY() + OtherObject.returnHeight()) &&
        //     (this.y + this.height) > OtherObject.returnPositionY())
        // {
        //     console.log();
        //     this.hascrash = true;
        // }
        return this.hascrash;
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
    cellIndex = 1;
    cells = [];
    ImgSrc;
    x;
    y;
    width;
    height;
    cell;
    visible = true;
    counter = 0;

    constructor(Image,cells,posX,posY,width,height)
    {
        this.ImgSrc = Image;
        this.cells = cells;
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
    }

    render(context)
    {
        if(this.visible === true)
        {
            console.log("Here i am");
            this.cell = this.cells[this.cellIndex];

            context.drawImage(this.ImgSrc, this.cell.SPRITE_X,
                this.cell.SPRITE_Y, this.cell.SPRITE_WIDTH,
                this.cell.SPRITE_HEIGHT , this.x, this.y, this.width, this.height);
        }
        // context.fillRect(20,30,30,30);
    }
    
    advance()
    {
        this.counter++;
        let z = this.counter % 5;
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
