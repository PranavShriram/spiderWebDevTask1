class sprite
{
    constructor(angle,x,y,radius)
    {
        this.angle = angle;//angle between vertical and line joining dots
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.posy_red = this.y-this.radius*Math.sin(this.angle-Math.PI/2);
        this.posx_red = this.x-this.radius*Math.cos(this.angle-Math.PI/2);
        this.posy_blue = this.y+this.radius*Math.sin(this.angle-Math.PI/2);
        this.posx_blue = this.x+this.radius*Math.cos(this.angle-Math.PI/2);
        this.orbRadius = 10;
        this.angleBetweenOrbs = Math.PI;//Angle of blue w.r.t red 
        this.rotationSpeed =  Math.PI/45
       
    }

    draw(ctx)
    {
          this.posy_red = this.y-this.radius*Math.sin(this.angle-Math.PI/2);
          this.posx_red = this.x-this.radius*Math.cos(this.angle-Math.PI/2);
          this.posy_blue = this.y-this.radius*Math.sin(this.angle-Math.PI/2+this.angleBetweenOrbs);
          this.posx_blue = this.x-this.radius*Math.cos(this.angle-Math.PI/2+this.angleBetweenOrbs);
          ctx.beginPath();
          ctx.strokeStyle = "white";
          ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
          ctx.stroke();
          ctx.closePath();  

          // ctx.save();
          // ctx.translate(this.x,this.y);
          // ctx.rotate(this.angle);
          
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.arc(this.posx_red,this.posy_red,this.orbRadius,0,Math.PI*2,true);
          ctx.fill();
          ctx.closePath();
          
          ctx.beginPath();
          ctx.fillStyle = "blue";
          ctx.arc(this.posx_blue,this.posy_blue,this.orbRadius,0,Math.PI*2,true);
          ctx.fill();
          ctx.closePath();

         // ctx.restore();
    }
    orbsFuse()
    {
         // this.isFused = true;
         this.angleBetweenOrbs -= Math.PI/30;
         if(this.angleBetweenOrbs < 0)
          this.angleBetweenOrbs = 0;

    }
    unwrap()
    {
         this.angleBetweenOrbs += Math.PI/30;
         if(this.angleBetweenOrbs > Math.PI)
          this.angleBetweenOrbs = Math.PI
    }
    collisionDetection(rectArr)
    {   
       
     
          var flag = 0;
          var  i = 0;
          var index = 0;

        for(var i = 0;i < rectArr.length;i++)
        {  
          var px = this.posx_red;
          var py = this.posy_red;

          if(rectArr[i].isRotated === true)
          {
             px = cos(-rectArr[i].rotatedAngle) * (px-rectArr[i].x) - sin(-rectArr[i].rotatedAngle) * (py-rectArr[i].y) + rectArr[i].x;

             py = sin(-rectArr[i].rotatedAngle) * (px-rectArr[i].x) + cos(-rectArr[i].rotatedAngle) * (py-rectArr[i].y) + rectArr[i].y;
          }

          var testX = px;
          var testY = py;

          if (px < rectArr[i].x)         
          testX = rectArr[i].x;      
          else if (px > rectArr[i].x+rectArr[i].width) testX = rectArr[i].x+rectArr[i].width;  
          if (py < rectArr[i].y)         testY = rectArr[i].y;     
          else if (py> rectArr[i].y+rectArr[i].height) testY = rectArr[i].y+rectArr[i].height;   

  
         var distX = px-testX;
         var distY = py-testY;
         var distance = Math.sqrt( (distX*distX) + (distY*distY) );
         
         if (distance <= this.orbRadius) 
          {
            flag = 1;
            index = i;
           
          }
       
        }
        for(var i = 0;i < rectArr.length;i++)
        {

          var px = this.posx_blue;
          var py = this.posy_blue;

          if(rectArr[i].isRotated === true)
          {
             px = cos(-rectArr[i].rotatedAngle) * (px-rectArr[i].x) - sin(-rectArr[i].rotatedAngle) * (py-rectArr[i].y) + rectArr[i].x;

             py = sin(-rectArr[i].rotatedAngle )* (px-rectArr[i].x) + cos(-rectArr[i].rotatedAngle) * (py-rectArr[i].y) + rectArr[i].y;
          }  
        

          var testX = px;
          var testY = py;
          
          
         
          if (px < rectArr[i].x)         
          testX = rectArr[i].x;      
          else if (px > rectArr[i].x+rectArr[i].width) testX = rectArr[i].x+rectArr[i].width;  
          if (py < rectArr[i].y)         testY = rectArr[i].y;     
          else if (py > rectArr[i].y+rectArr[i].height) testY = rectArr[i].y+rectArr[i].height;   

  
         var distX = px-testX;
         var distY = py-testY;
         var distance = Math.sqrt( (distX*distX) + (distY*distY) );
         
         
         if (distance <= 10) {
            flag = 1;
            index = i;
         
          }
       
        }

        if(flag == 1)
         return index;
        else
         return -1; 
    }
}