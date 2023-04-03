var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player1;
var player2;
var ball;
var cursors;
var scoreText1;
var scoreText2;
var score1 = 0;
var score2 = 0;

function preload ()
{
    this.load.image('ball', 'assets/ball.png');
    this.load.image('paddle', 'assets/paddle.png');
}

function create ()
{
    player1 = this.physics.add.sprite(50, 300, 'paddle');
    player1.setCollideWorldBounds(true);
    player1.setImmovable(true);

    player2 = this.physics.add.sprite(750, 300, 'paddle');
    player2.setCollideWorldBounds(true);
    player2.setImmovable(true);

    ball = this.physics.add.sprite(400, 300, 'ball');
    ball.setCollideWorldBounds(true);
    ball.setBounce(1);

    cursors = this.input.keyboard.createCursorKeys();

    scoreText1 = this.add.text(16, 16, 'Player 1: 0', { fontSize: '32px', fill: '#000' });
    scoreText2 = this.add.text(550, 16, 'Player 2: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(ball, player1, hitPaddle, null, this);
    this.physics.add.collider(ball, player2, hitPaddle, null, this);
}

function update ()
{
    if (cursors.up.isDown)
    {
        player1.setVelocityY(-300);
    }
    else if (cursors.down.isDown)
    {
        player1.setVelocityY(300);
    }
    else
    {
        player1.setVelocityY(0);
    }

    if (cursors.left.isDown)
    {
        player1.setVelocityX(-300);
    }
    else if (cursors.right.isDown)
    {
        player1.setVelocityX(300);
    }
    else
    {
        player1.setVelocityX(0);
    }

    if (ball.body.velocity.x === 0 && ball.body.velocity.y === 0)
    {
        ball.setVelocityX(300);
        ball.setVelocityY(300);
    }

    if (ball.body.blocked.left)
    {
        score2 += 1;
        scoreText2.setText('Player 2: ' + score2);
        ball.setPosition(400, 300);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
    }

    if (ball.body.blocked.right)
    {
        score1 += 1;
        scoreText1.setText('Player 1: ' + score1);
        ball.setPosition(400, 300);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
