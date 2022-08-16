class Chao {
    constructor(x, y, l, a){
        var config = {
            isStatic: true
        }
        this.terra = Bodies.rectangle(x,y,l,a, config);
        this.lar = l;
        this.alt = a;
        World.add(world, this.terra);
    }

    draw(){
        var pos = this.terra.position;
        push();
        rectMode(CENTER);
        fill(47,27,13);
        noStroke();
        rect(pos.x, pos.y, this.lar, this.alt);
        pop();
    }
}