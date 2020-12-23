var FoodStock;
var lastFed;

class Food
{
    constructor()
    {
        FoodStock = database.ref('food');
        FoodStock.on("value", readStock);
        FoodS = 20;

        this.image = loadImage("images/Food Stock.png");
    }

writeStock()
{
  if(FoodStock <= 0)
  {
    FoodStock = 0;
  }
  else
  {
    FoodStock = FoodStock-1
  }

  database.ref('/').update(
    {
      'food' : FoodStock
    }
  )
}

addStock()
{
    if(FoodStock >= 20)
  {
    FoodStock = 20;
  }
  else
  {
    FoodStock = FoodStock+1
  }

  database.ref('/').update(
    {
      'food' : FoodStock
    }
  )
}



    display()
    {
        var x = 80, y = 180;

        imageMode(CENTER);
        var img //= image(this.image, 720, 220, 70, 70);

        //FoodStock = 20;

        if(FoodStock != 0)
        {
            for(var i=0; i < FoodStock; i++)
            {
                if(i % 10 === 0)
                {
                    x = 80;
                    y = y+70;
                }
                img = image(this.image, x, y, 50, 50);
                x = x + 50;
            }
        }
    }
}