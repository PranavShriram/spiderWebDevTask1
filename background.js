class background
{ 
   constructor(screen_width,screen_height)
   { 
     this.squareArr = [];
     this.n_column = screen_width / 100 + 1;
     this.n_row = screen_height/100 + 1;
     this.angle = 0;
   }

   draw_background(ctx)
   {
        ctx.fillStyle = "rgb(22, 22, 22)";

        for(var i = 0;i < this.n_column;i++)
        {
            for(var j = 0;j < this.n_row;j++)
            {
                ctx.beginPath();
                ctx.save();
                ctx.translate(i*100,j*100);
                ctx.rotate(this.angle)
                ctx.fillRect( 0, 0, 50, 50);
                ctx.restore();
            }
        }
        if(this.angle % 2*Math.PI == 0 )
        {
            
        }
   }
   
   
}