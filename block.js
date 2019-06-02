class block
{
    constructor(width,height,x,y,isRotating,type)
    {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.isRotating = isRotating;
        this.rotatedAngle = 0;
        this.type = type //type1 -> obstacle type2 -> horlicks boost type3-> Flight boost
    }

    draw(ctx)
    {   
       if(this.type === 1)
       { 
        if(this.isRotating === true)
         this.rotatedAngle += Math.PI/60; 

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.save();
        ctx.translate(this.x,this.y)
        ctx.rotate(this.rotatedAngle);
        ctx.fillRect(0, 0,this.width,this.height);
        ctx.restore();
        ctx.closePath();
       }
       else if(this.type === 2)
       {  
           var image1 = new Image(this.width,this.height);
           image1.src = "./assets/horlicks.jpg";
           image1.custom = {x:this.x,y:this.y};
           image1.onload = 
           function()
           {
            ctx.drawImage(image1,this.custom.x,this.custom.y,this.width,this.height);
           };

       } 
       else if(this.type === 3)
       {
        var image2 = new Image(this.width,this.height);
        image2.src = "./assets/flight.png";
        image2.custom = {x:this.x,y:this.y};
    
        image2.onload = 
        function()
        {
         ctx.drawImage(image2,this.custom.x,this.custom.y,this.width,this.height);
        };
       }
    }
}