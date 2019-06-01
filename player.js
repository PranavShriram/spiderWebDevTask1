class player
{  
    constructor()
    {
      this.score = 0;
      this.gameSpeed = 5;
      this.powerMeter = 0;
    }
    incrementScore(a)
    {
        this.score += a;
    }
    gameOver()
    {
        this.score = 0;
    }
}