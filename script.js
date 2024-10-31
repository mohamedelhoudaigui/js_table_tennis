 
// globals :
const BallColor = "#cd202c"
const RacketColor = "#aaaaaa"
const CanvasColor = "#f1e1e9"
const LineColor = "#000000"


const CanvasWidth = 1000
const CanvasHeight = 500
const CanvasId = "gameCanvas"
const ContextType = "2d"

const BallStartX = CanvasWidth / 2;
const BallStartY = CanvasHeight / 2;
const BallRaduis = CanvasWidth / 100;
const VelocityX = 3;
const VelocityY = 3;

const RacketVelocity = 4
const RacketWidth = CanvasWidth / 100
const RacketHeight = CanvasHeight / 6
const RacketStartX = 40
const RacketStartY = (CanvasHeight / 2) - (RacketHeight / 2)

const RightUp = "o"
const RightDown = "l"
const LeftUp = "w"
const LeftDown = "s"

let GameEnd = false


// Classes :

class Ball {
	constructor(x, y, raduis, VelocityX, VelocityY, color, canvas)
	{
		this.x = x
		this.y = y
		this.raduis = raduis
		this.VelocityX = VelocityX
		this.VelocityY = VelocityY
		this.color = color

		this.canvas = canvas
		this.context = canvas.context
	}

	Draw()
	{
		this.context.beginPath()
		this.context.fillStyle = this.color
		this.context.arc(this.x, this.y, this.raduis, 0, 2 * Math.PI)
		this.context.fill()
	}

	CheckCollitionWall()
	{
		if ((this.y >= this.canvas.height - this.raduis) ||
			(this.y <= this.raduis))
		{
			this.VelocityY = -(this.VelocityY)
		}
		if ((this.x <= this.raduis * 2) ||
			(this.x >= this.canvas.width - (this.raduis * 2)))
		{
			GameEnd = true
		}
	}

	CheckCollitionRacket(RightRacket, LeftRacket)
	{
		if ((this.x <= LeftRacket.x + (LeftRacket.width / 2 + this.raduis)) &&
			(this.y >= LeftRacket.y && this.y <= LeftRacket.y + LeftRacket.height)) // the ball center is on the right side
		{
			this.VelocityX = -(this.VelocityX)
		}
		if ((this.x >= RightRacket.x - RightRacket.width / 2) &&
			(this.y >= RightRacket.y && this.y <= RightRacket.y + RightRacket.height))
		{
			this.VelocityX = -(this.VelocityX)	
		}
	}
	
	UpdatePosition ()
	{
		this.x += this.VelocityX
		this.y += this.VelocityY
	}
}

class Racket {
	constructor(x, y, width, height, Velocity, color, canvas, upkey, downkey)
	{
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.Velocity = Velocity
		this.color = color
		this.upkey = upkey
		this.downkey = downkey

		this.canvas = canvas
		this.context = canvas.context

		document.addEventListener("keypress", (event) =>
		{
            this.handleKeyUp(event)
        })
	}

	Draw()
	{
		this.context.fillStyle = this.color
		this.context.fillRect(this.x, this.y, this.width, this.height)
	}

	handleKeyUp(event)
	{
        if (event.key === this.upkey)
		{
			if (this.y > 0)
            	this.y -= this.Velocity;
        }

        if (event.key === this.downkey)
		{
			if (this.y < this.canvas.height - this.height)
            	this.y += this.Velocity;
        }
    }
}

class Canvas {
	constructor(CanvasWidth, CanvasHeight, CanvasId, ContextType)
	{
		this.canvas = document.getElementById(CanvasId)
		this.context = this.canvas.getContext(ContextType)
		this.width = CanvasWidth
		this.height = CanvasHeight
		this.canvas.width = this.width
		this.canvas.height = this.height
	}

	Clear()
	{
		this.context.clearRect(0, 0, this.width, this.height)
	}

	Draw()
	{
		this.context.fillStyle = CanvasColor
		this.context.fillRect(0, 0, this.width, this.height)
		this.context.fillStyle = LineColor
		this.context.fillRect(this.width / 2, this.height / 20,
								2, this.height - (this.height / 20) * 2)

	}
}


let c = new Canvas(CanvasWidth, CanvasHeight, CanvasId, ContextType)

let ball = new Ball(BallStartX, BallStartY, BallRaduis,
					VelocityX, VelocityY, BallColor, c)

let leftRacket = new Racket(RacketStartX, RacketStartY,
							RacketWidth, RacketHeight,
							RacketVelocity, RacketColor, c,
							LeftUp, LeftDown)

let rightRacket = new Racket(c.width - RacketStartX, RacketStartY,
							RacketWidth, RacketHeight,
							RacketVelocity, RacketColor, c,
							RightUp, RightDown)


// game loops :

function GameUpdate()
{
	ball.CheckCollitionWall()
	ball.CheckCollitionRacket(rightRacket, leftRacket)
	ball.UpdatePosition()
	// racket update is in the constructor
}

function GameDraw()
{
	c.Clear()

	c.Draw()
	ball.Draw()
	rightRacket.Draw()
	leftRacket.Draw()
}

function GameLoop()
{
	if (!GameEnd)
		window.requestAnimationFrame(GameLoop)
	GameUpdate()
	GameDraw()
}

GameLoop()