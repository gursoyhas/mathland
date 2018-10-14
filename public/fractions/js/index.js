    var plane;
	var star1,star2;
	var text1, text2;
	var style;
	var createdStars = false;
	var star1_value1, star1_value1;
	var star2_value2, star2_value2;
	var trueAnswers =0 ;
	var falseAnswers = 0;
	var answers_false, answers_true;
	var skipped = 0;
	var answers_skipped;
	var gameOver = false;
	var overText;
	var gameOverText;
	var infoText;

	var totalScore = 0;
	
	var config = {
        type: Phaser.AUTO,
        autoResize: true,
        parent: 'game',
        width: window.innerWidth,
        height: window.innerHeight,
		physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
        scene: {
            preload: preload,
            create: create,
            update: update,
			
        }
    };
    
    var game = new Phaser.Game(config);

    // Source @robmuh  on html5gamedevs.com
    // http://www.html5gamedevs.com/topic/36607-scaling-the-canvas-for-pixel-art/?do=findComment&comment=209927
    function resize() {
        var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
        var wratio = width / height, ratio = canvas.width / canvas.height;

        if (wratio < ratio) {
            canvas.style.width = width + "px";
            canvas.style.height = (width / ratio) + "px";
        } else {
            canvas.style.width = (height * ratio) + "px";
            canvas.style.height = height + "px";
        }
    }    
    
    function preload() {
        this.load.atlas('sheet', 'img/sheet.png', 'img/sheet.json');
		this.load.image('star', 'img/star.png');
    }
    
    function create() {
        window.addEventListener('resize', resize);
        resize();
		
        
        this.bg = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'sheet', 'background.png').setOrigin(0);
        plane = this.physics.add.sprite(window.innerWidth/10, window.innerHeight/2, 'sheet', 'planeBlue1.png');
		
		
		star1 = this.physics.add.sprite(window.innerWidth* 3/5,window.innerHeight * 1/3,'star').setScale(4);
		
		
		star2 = this.physics.add.sprite(window.innerWidth* 3/5,window.innerHeight* 2/3,'star').setScale(4);
		style = { font: "20px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: star1.width, align: "center" , fontStyle :"bold" , lineSpacing:-5};
		star1_value1  = Random();
		star1_value2  = Random();
		star2_value1  = Random();
		star2_value2  = Random();
		
		text1 = this.add.text(Math.floor(star1.x )- 2, Math.floor(star1.y)-star1.height, star1_value1 + "\n—\n" + star1_value2, style);
		text2 = this.add.text (Math.floor(star2.x)-2, Math.floor(star1.y)- star2.height ,star2_value1 + "\n—\n" + star2_value2 , style );

		createdStars = true;
		//Input Events
		cursors = this.input.keyboard.createCursorKeys();
		
		answers_true = this.add.text(16, 16, 'Doğru Yanıt: 0', { fontSize: '16px', fill: '#000' });
		answers_false = this.add.text(16, 32, 'Yanlış Yanıt: 0', { fontSize: '16px', fill: '#000' });
		answers_skipped = this.add.text(16, 48, 'Boş Geçilen Yanıt: 0', { fontSize: '16px', fill: '#000' });
		totalScore = (trueAnswers* 10) - (falseAnswers * 10 ) - (skipped * 5 ) ;
		overText = this.add.text (window.innerWidth-200,16, "Toplam Puan: "  +  totalScore ,{ fontSize: '16px', fill: '#000' } );
		gameOverText = this.add.text(window.innerWidth* 2/5, window.innerHeight* 2/5, 'Oyun bitti. \nYeniden başlamak için ekrana dokun.' , {fill : 'black', lineSpacing:20, font:'20px Arial', fontStyle: 'bold'});
		gameOverText.visible = false;
		infoText = this.add.text (window.innerWidth*2/5,16, "Daha büyük sayıya\nsahip olan yıldızı\nalarak puan topla" ,{ fontSize: '16px', fill: '#000' } );

    } 

function Star1Collected (plane, star1)
{
	
    star1.disableBody(true, true);
	star2.disableBody(true, true);
	text1.destroy();
	text2.destroy();
	createdStars = false;
	
	star1Value = star1_value1 / star1_value2;
	star2Value = star2_value1 / star2_value2;
	
	if (star1Value >= star2Value ) 
	{trueAnswers++;}
	else {
		falseAnswers++;		}
		
		answers_true.setText('Doğru Yanıt: ' + trueAnswers);
		answers_false.setText('Yanlış Yanıt: ' + falseAnswers);
		totalScore = (trueAnswers* 10) - (falseAnswers * 10 ) - (skipped * 5 ) ;
		overText.setText ("Toplam Puan: "  +  totalScore );
		infoText.visible = false;
	

}
function Star2Collected (plane, star2)
{
	
    star1.disableBody(true, true);
	star2.disableBody(true, true);
	text1.destroy();
	text2.destroy();
	createdStars = false;
	star1Value = star1_value1 / star1_value2;
	star2Value = star2_value1 / star2_value2;
		if (star2Value >= star1Value ) 
		{trueAnswers++;
		}
		else {
		falseAnswers++;		}
		
		answers_true.setText('Doğru Yanıt: ' + trueAnswers);
		answers_false.setText('Yanlış Yanıt: ' + falseAnswers);
		totalScore = (trueAnswers* 10) - (falseAnswers * 10 ) - (skipped * 5 ) ;
		overText.setText ("Toplam Puan: "  +  totalScore );
		infoText.visible = false;
}

function StarsSkipeed ()
{
    star1.disableBody(true, true);
	star2.disableBody(true, true);
	text1.destroy();
	text2.destroy();
	createdStars = false;
	skipped++;
	answers_skipped.setText('Boş Geçilen Yanıt: ' + skipped);
	totalScore = (trueAnswers* 10) - (falseAnswers * 10 ) - (skipped * 5 ) ;
	overText.setText ("Toplam Puan: "  +  totalScore );
	infoText.visible = false;

}

function game_over () {
	gameOver = true;
	star1.disableBody(true, true);
	star2.disableBody(true, true);
	text1.destroy();
	text2.destroy();
	
}

function Random () {
return Phaser.Math.Between(1, 20);
	}

function restart () {
	trueAnswers = 0;
	
	falseAnswers = 0;
	skipped = 0;
	plane.destroy();
	gameOverText.visible = false;
	createdStars = false;
	answers_true.setText('Doğru Yanıt: 0');
	answers_false.setText('Yanlış Yanıt: 0');
	answers_skipped.setText('Boş Geçilen Yanıt: 0' );
	overText.setText('Toplam Puan: 0');
	infoText.visible = false;
	
}
    function update() {
		
		
		if (gameOver) {
		gameOverText.visible = true;
		
		
		
		if ( game.input.activePointer.isDown) {
			gameOver = false;
			
			restart();
			
			plane = this.physics.add.sprite(window.innerWidth/10, window.innerHeight/2, 'sheet', 'planeBlue1.png');
		}
		return;
		}
		gameOver.visible = false;
        this.bg.tilePositionX += 5;

		if (createdStars == false)  {
		star1 = this.physics.add.sprite(window.innerWidth* 3/5,window.innerHeight * 1/3,'star').setScale(4);
		
		star2 = this.physics.add.sprite(window.innerWidth* 3/5,window.innerHeight * 2/3,'star').setScale(4);
		star1_value1  = Random();
		star1_value2  = Random();
		star2_value1  = Random();
		star2_value2  = Random();
		text1 = this.add.text(Math.floor(star1.x ), Math.floor(star1.y), star1_value1 + "\n—\n" + star1_value2, style);
	
		text2 = this.add.text (Math.floor(star2.x), Math.floor(star1.y) , star2_value1 + "\n—\n" + star2_value2 , style );
		
		createdStars = true;
		
		
		}
		
		if (plane.y >= window.innerHeight ) {
			game_over();
			
		}
		if (star1.x < plane.x ) { 
		
		StarsSkipeed();
		}
		star1.setVelocityX(-150);
		star1.body.setGravityY(-500);
		star2.setVelocityX(-150);
		star2.body.setGravityY(-500);
		
		text1.x = Math.floor(star1.x - star1.width/2 );
		text1.y = Math.floor(star1.y - star1.height/2*3 +4 );
		text2.x = Math.floor(star2.x -star1.width/2 );
		text2.y = Math.floor(star2.y - star2.height/2*3+4);
		
		this.physics.add.overlap(plane, star1, Star1Collected, null, this);
		this.physics.add.overlap(plane, star2, Star2Collected, null, this);
		if (cursors.up.isDown || game.input.activePointer.isDown)
		{
			plane.setVelocityY(-200);
		}
    }


