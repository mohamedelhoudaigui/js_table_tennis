 
// globals :
const BallColor = "#cd202c"
const RacketColor = "#aaaaaa"
const CanvasColor = "#f1e1e9"


const CanvasWidth = 1000
const CanvasHeight = 400
const CanvasId = "gameCanvas"
const ContextType = "2d"

const BallStartX = CanvasWidth / 2;
const BallStartY = CanvasHeight / 2;
const BallRaduis = 10;
const VelocityX = 3;
const VelocityY = 3;

const RacketVelocity = 1
const RacketWidth = 10
const RacketHeight = 100
const RacketStartX = 50
const RacketStartY = 50


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

	CheckVelocity()
	{
		if ((this.x >= this.canvas.width - this.raduis) || (this.x <= this.raduis))
		{
			this.VelocityX = -(this.VelocityX)
		}
			
		if ((this.y >= this.canvas.height - this.raduis) || (this.y <= this.raduis))
		{
			this.VelocityY = -(this.VelocityY)
		}
	}
	
	UpdatePosition ()
	{
		this.x += this.VelocityX
		this.y += this.VelocityY
	}
}

class Racket {
	constructor(x, y, width, height, Velocity, color, canvas)
	{
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.Velocity = Velocity
		this.color = color

		this.canvas = canvas
		this.context = canvas.context
	}

	Draw()
	{
		this.context.fillStyle = this.color
		this.context.fillRect(this.x, this.y, this.width, this.height)
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
		this.context.clearRect(0, 0, CanvasWidth, CanvasHeight)
	}

	Draw()
	{
		this.context.fillStyle = CanvasColor
		this.context.fillRect(0, 0, CanvasWidth, CanvasHeight)
	}
}


let c = new Canvas(CanvasWidth, CanvasHeight, CanvasId, ContextType)
let ball = new Ball(BallStartX, BallStartY, BallRaduis, VelocityX, VelocityY, BallColor, c)
let leftRacket = new Racket(RacketStartX, RacketStartY, RacketWidth, RacketHeight, RacketVelocity, RacketColor, c)
let rightRacket = new Racket(c.width - RacketStartX, RacketStartY, RacketWidth, RacketHeight, RacketVelocity, RacketColor, c)


// game loops :

function GameUpdate()
{
	ball.CheckVelocity()
	ball.UpdatePosition()
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
	window.requestAnimationFrame(GameLoop)
	GameUpdate()
	GameDraw()
}

GameLoop()