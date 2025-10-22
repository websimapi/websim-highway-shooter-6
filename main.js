import Game from 'game';
import { renderReplay, unmountReplay } from './replay.jsx';

window.addEventListener('load', () => {
    const canvas = document.getElementById('game-canvas');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let game;
    let animationFrameId = null;

    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const gameOverScreen = document.getElementById('game-over-screen');
    const restartButton = document.getElementById('restart-button');
    const finalScoreEl = document.getElementById('final-score');
    const scoreEl = document.getElementById('score');
    const bombsEl = document.getElementById('bombs');
    const uiContainer = document.getElementById('ui-container');
    const powerupTimerEl = document.getElementById('powerup-timer');

    function startGame() {
        if (unmountReplay) unmountReplay();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        startScreen.style.display = 'none';
        gameOverScreen.style.display = 'none';
        uiContainer.style.display = 'flex';
        powerupTimerEl.style.display = 'none';
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        updateScore(0);
        updateBombCount(1); // Starting bombs
        if (game) {
            game.destroy();
        }
        game = new Game(canvas.width, canvas.height, canvas);
        game.onGameOver = showGameOver;
        game.onScoreUpdate = updateScore;
        game.onBombUpdate = updateBombCount;
        game.onPowerUpUpdate = updatePowerupTimer;
        
        lastTime = 0; // Reset timer for new game
        animate();
    }
    
    let lastTime = 0;
    function animate(timestamp = 0) {
        if (!game || game.gameOver) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            return;
        }

        animationFrameId = requestAnimationFrame(animate);

        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        if (game.assetsLoaded) { // Only update and draw if assets are ready
            game.update(deltaTime);
            game.draw();
        }
    }

    function showGameOver(score, history) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        uiContainer.style.display = 'none';
        gameOverScreen.style.display = 'flex';
        finalScoreEl.textContent = score;
        const replayContainer = document.getElementById('replay-container');
        if (replayContainer && history && history.length > 0) {
            renderReplay(history, replayContainer, canvas.width, canvas.height);
        }
    }

    function updateScore(score) {
        scoreEl.textContent = `Score: ${score}`;
    }

    function updateBombCount(count) {
        bombsEl.textContent = `Bombs: ${count}`;
    }

    function updatePowerupTimer(isActive, timeLeft) {
        if (isActive) {
            powerupTimerEl.style.display = 'inline-block';
            powerupTimerEl.textContent = `Rapid Fire: ${(timeLeft / 1000).toFixed(1)}s`;
        } else {
            powerupTimerEl.style.display = 'none';
        }
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (game) {
            game.resize(canvas.width, canvas.height);
        }
    });
});