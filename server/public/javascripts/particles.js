$(function()
{
	var canvas = document.getElementById("particles-overlay");
	var ctx = canvas.getContext("2d");

	var particles = null;
	
	var PARTICLE_COUNT = 75;

  window.particlesExplodeAt = function(x, y, direction, force)
  {
    particles = new Array(PARTICLE_COUNT);
    for(var i = 0; i < PARTICLE_COUNT; i++)
      particles[i] = new Particle(x, y, direction, force);
  };
	
	function Particle(x, y, direction, force)
	{
    switch(direction)
    {
      case 'UP':
        this.speed = {
          x: -10 + Math.random() * 20 * force / 10,
          y: -20 + Math.random() * 20 * force / 10
        };
        break;

      case 'LEFT':
        this.speed = {
          x: -20.5 + Math.random() * 20 * force / 10,
          y: -10 + Math.random() * 20 * force / 10
        };
        break;

      case 'RIGHT':
        this.speed = {
          x: 20.5 + Math.random() * 20 * force / 10,
          y: -10 + Math.random() * 20 * force / 10
        };
        break;

      case 'DOWN':
        this.speed = {
          x: -10 + Math.random() * 20 * force / 10,
          y: 20 + Math.random() * 20 * force / 10
        };
        break;

      default:
        break;
    }

    this.location = {x: x, y: y};

    this.radius        = 10 + Math.random() * 20;
    this.life          = 20 + Math.random() * 10;
    this.remainingLife = this.life;

		this.r = Math.round(Math.random() * 255);
		this.g = Math.round(Math.random() * 128);
		this.b = Math.round(Math.random() * 128);
	}
	
	function draw()
	{
		//Painting the canvas black
		//Time for lighting magic
		//particles are painted with "lighter"
		//In the next frame the background is painted normally without blending to the 
		//previous frame
		// ctx.globalCompositeOperation = "source-over";
		// ctx.fillStyle = "black";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = "lighter";

    if(!particles) return;
		
    var hasParticle = false;
		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
      if(!p) continue;

      hasParticle = true;

			ctx.beginPath();
			//changing opacity according to the life.
			//opacity goes to 0 at the end of life of a particle
			p.opacity = Math.round(p.remainingLife/p.life*100)/100;
			//a gradient instead of white fill
			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			ctx.fill();
			
			//lets move the particles
			p.remainingLife--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;
			
			//regenerate particles
			if(p.remainingLife < 0 || p.radius < 0)
				particles[i] = null;
		}

    if(!hasParticle)
      particles = null;
	}
	
	setInterval(draw, 33);
  // window.explodeAt(200, 300);
});
