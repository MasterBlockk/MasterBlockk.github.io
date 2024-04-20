let config = {
    width: window.innerWidth / 2,
    height: window.innerHeight,
    canvasStyle: 'border-left: 5px solid #000; border-right: 5px solid #000',
    transparent :true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, 
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'assets/ground.png');
    this.load.image('object', 'assets/object.png');
    this.load.image('player', 'assets/player.png');
}
let gameWidth;
let gameHeight;
let ground;
let player;
let object;
let object_color;
let xPosition;
let cursors;
let keys;
let objectSpeed = -999999999999999999999;
let left_controls;
let right_controls;
let ScoreText;
let movingScore;
let retry;
let score_game_over;
let death_sound;
let retry_song;
let point_song;

function create() {

    this.cameras.main.setBackgroundColor('#EADFB4');

    gameWidth = this.sys.game.config.width;
    gameHeight = this.sys.game.config.height;


    ground = this.physics.add.image(0, 500, 'ground').setScale(window.innerWidth / 2, window.innerHeight / 500);
    ground.setCollideWorldBounds(true);
    ground.setVisible(false);
    ground.setTint(0x000000);

    player = this.physics.add.image(100, 400, 'player').setScale(0.4);
    player.setBounce(0);
    player.setCollideWorldBounds(true);
    player.setTint(0x51829B);
    player.setVisible(false);

    this.physics.add.collider(player, ground);

    xPosition = Phaser.Math.Between(0, gameWidth);
    
    object = this.physics.add.image(xPosition, 0, 'object').setScale(0.175);
    object.setCollideWorldBounds(true);
    object.setTint(0xF6995C);
    object.setVisible(false);

    cursors = this.input.keyboard.createCursorKeys();

    keys = this.input.keyboard.addKeys('Q, D');

    movingScore = 0;

    ScoreText = document.getElementById('score_text');

    
    left_controls = document.getElementById('left_controls');
    right_controls = document.getElementById('right_controls');

    left_controls.addEventListener('touchstart', function() {
        left_controls.isPressed = true;
        });

    left_controls.addEventListener('touchend', function() {
        left_controls.isPressed = false;
    });

    right_controls.addEventListener('touchstart', function() {
        right_controls.isPressed = true;
    });

    right_controls.addEventListener('touchend', function() {
        right_controls.isPressed = false;
    });

    retry = document.getElementById('retry');

    score_game_over = document.getElementById('score_game_over');

    death_sound = document.getElementById('death_sound');

    retry_song = document.getElementById('retry_song');

    point_song = document.getElementById('point_song');
}

function update() {

    if (cursors.left.isDown || keys.Q.isDown || left_controls.isPressed) {
        player.setVelocityX(-750 - increaseSpeedOverTime());
    }
    else if (cursors.right.isDown || keys.D.isDown || right_controls.isPressed) {
        player.setVelocityX(750 + increaseSpeedOverTime());
    }
    else {
        player.setVelocityX(0);
    }

    objectSpeed = increaseSpeedOverTime();

    object.setVelocityY(objectSpeed);

    if (this.physics.overlap(player, object)) {
        object_color_function();
        
    if (object.tintTopLeft == 0xF6995C) {

        movingScore += 1;

        ScoreText.innerHTML = movingScore;
        
        object.setTint(object_color);
        object.setActive(false);
        object.setX(Phaser.Math.Between(0, gameWidth));
        object.setY(0);
        object.setVelocityY(0);     
        object.setActive(true);

        point_song.play();

    } else {
            object.setVisible(false);
            objectSpeed = -999999999999999999999;
    
            player.setVisible(false);
            
            ScoreText.innerHTML = movingScore; 
    
            score_game_over.innerHTML = movingScore;
    
            retry.style.translate = '0vw 100vh';
    
            death_sound.play();
            playsound.pause();
            playsound.currentTime = 0;
            playsound.load();
            retry_song.play();
           
        }
        
    }

    if (this.physics.overlap(object, ground)) {
        if (object.tintTopLeft == 0xF6995C) {
        object.setVisible(false);
        objectSpeed = -999999999999999999999;

        player.setVisible(false);
        
        ScoreText.innerHTML = movingScore; 

        score_game_over.innerHTML = movingScore;

        retry.style.translate = '0vw 100vh';

        death_sound.play();
        playsound.pause();
        playsound.currentTime = 0;
        playsound.load();
        retry_song.play();
        
    } else {
        
        object_color_function();
            
        movingScore += 1;

        ScoreText.innerHTML = movingScore;
        
        object.setTint(object_color);
        object.setActive(false);
        object.setX(Phaser.Math.Between(0, gameWidth));
        object.setY(0);
        object.setVelocityY(0);     
        object.setActive(true);

        point_song.play();

        }
        
    }



    
}

function increaseSpeedOverTime() {
    
    return objectSpeed + game.loop.delta / 50;
};

function object_color_function() {
    
    object_color = Phaser.Math.Between(1, 5);

    if (object_color != 1) {
    object_color = 0xF6995C;
    } else if (object_color == 1) {
    object_color = 0x000000;
    };
};


let menu = document.getElementById('menu');
let play_button = document.getElementById('play_button');

let playsound = document.getElementById('playsound');
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

let menu_song = document.getElementById('menu_song');

let white_div = document.getElementById('white_div');


window.onload = function() {
    menu_song.play();
};

play_button.addEventListener('click', function() {
    
    setTimeout(function() {

        menu.style.translate = '0vw -100vh';
        
        ground.setVisible(true);

        player.setVisible(true);

        object.setVisible(true);

        objectSpeed = 300;

        white_div.style.opacity = 0;

        playsound.play();
        menu_song.pause();
        menu_song.currentTime = 0;
        menu_song.load();
    }, 1000);

    setTimeout(function() {
        white_div.style.translate = '0vw -100vh';
    }, 2000);

    white_div.style.opacity = 100;
    white_div.style.translate = '0vw 100vh';

    player.setX(window.innerWidth / 2, window.innerHeight);
    
});

document.getElementById('retry_button').addEventListener('click', function() {
    objectSpeed = 300;
    object.setVisible(true);
    object.setX(Phaser.Math.Between(0, gameWidth));

    player.setVisible(true);
    player.setX(gameWidth / 2, window.innerHeight);

    ScoreText.innerHTML = 0;

    movingScore = 0;

    retry.style.translate = '0vw -100vh';

    death_sound.pause();
    death_sound.currentTime = 0;
    death_sound.load();
    retry_song.pause();
    retry_song.currentTime = 0;
    retry_song.load();
    playsound.play();
})

document.getElementById('quit_button').addEventListener('click', function() {
    
    setTimeout(function() {
        menu.style.translate = '0vw 0vh';

        white_div.style.opacity = 0;

        ground.setVisible(false);

        player.setVisible(false);

        object.setVisible(false);

        menu_song.play();
        death_sound.pause();
        death_sound.currentTime = 0;
        death_sound.load();
        retry_song.pause();
        retry_song.currentTime = 0;
        retry_song.load();
    }, 1000);

    setTimeout(function() {
        white_div.style.translate = '0vw -100vh';
    }, 2000);

    ScoreText.innerHTML = 0;

    movingScore = 0;

    retry.style.translate = '0vw -100vh';

    white_div.style.opacity = 100;
    white_div.style.translate = '0vw 100vh';
});



