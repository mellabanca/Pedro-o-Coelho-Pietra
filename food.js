class Food {
    constructor (alfa, beta){
        var bolacha = alfa.body.bodies.length-2;
        this.fio = Constraint.create ({
            bodyA: alfa.body.bodies[bolacha],
            pointA: {x: 0, y:0}, 
            bodyB: beta,
            pointB: {x: 0, y:0},
            length: -10,
            stiffness: 0.01
                })
    World.add(engine.world, this.fio);
    }

    detonaRalfh(){
      World.remove(engine.world, this.fio);
    }
}