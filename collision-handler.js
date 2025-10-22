import { checkCollision } from 'collision';

export default class CollisionHandler {
    constructor(game) {
        this.game = game;
    }

    checkCollisions() {
        const game = this.game;

        // Projectile collisions
        game.projectiles.forEach(projectile => {
            // vs Barrels
            game.barrels.forEach(barrel => {
                if (checkCollision(projectile, barrel)) {
                    projectile.active = false;
                    barrel.hit();
                    if (!barrel.active) {
                        game.score += barrel.maxHealth;
                        game.onScoreUpdate(game.score);
                        game.playAudio('destroy');
                        if (barrel.hasPowerUp) {
                            game.spawner.spawnPowerUp(barrel.x + barrel.width / 2, barrel.y + barrel.height / 2, barrel.powerUpType);
                        }
                    } else {
                        game.playAudio('hit');
                    }
                }
            });

            // vs Barriers
            game.barriers.forEach(barrier => {
                if (checkCollision(projectile, barrier)) {
                    projectile.active = false;
                    barrier.hit();
                    if (!barrier.active) {
                        game.score += barrier.maxHealth * 2;
                        game.onScoreUpdate(game.score);
                        game.playAudio('shatter');
                        game.effectManager.createShatterEffect(barrier);
                        if (barrier.hasPowerUp) {
                            game.spawner.spawnPowerUp(barrier.x + barrier.width / 2, barrier.y + barrier.height / 2, barrier.powerUpType);
                        }
                    } else {
                        game.playAudio('hit');
                    }
                }
            });

            // vs Enemies
            game.enemies.forEach(enemy => {
                if (checkCollision(projectile, enemy)) {
                    projectile.active = false;
                    enemy.hit();
                    if (!enemy.active) {
                        game.score += enemy.maxHealth * 5;
                        game.onScoreUpdate(game.score);
                        game.playAudio('destroy');
                        game.effectManager.createMonsterExplosionEffect(enemy);
                    } else {
                        game.playAudio('hit');
                    }
                }
            });
        });

        // Enemy vs Barrel collisions
        game.enemies.forEach(enemy => {
            game.barrels.forEach(barrel => {
                if (enemy.active && barrel.active && checkCollision(enemy, barrel)) {
                    enemy.active = false;
                    game.effectManager.createMonsterExplosionEffect(enemy);
                    barrel.hit();

                    if (!barrel.active) {
                        game.score += barrel.maxHealth;
                        game.onScoreUpdate(game.score);
                        game.playAudio('destroy');
                        if (barrel.hasPowerUp) {
                            game.spawner.spawnPowerUp(barrel.x + barrel.width / 2, barrel.y + barrel.height / 2, barrel.powerUpType);
                        }
                    } else {
                        game.playAudio('hit');
                    }
                }
            });
        });

        // Player collisions (game over conditions)
        const checkPlayerCollision = (object) => {
            if (checkCollision(game.player, object)) {
                game.gameOver = true;
            }
        };
        game.barrels.forEach(checkPlayerCollision);
        game.barriers.forEach(checkPlayerCollision);
        game.enemies.forEach(checkPlayerCollision);

        // Player vs Powerups
        game.powerups.forEach(powerup => {
            if (checkCollision(game.player, powerup)) {
                powerup.active = false;
                if (powerup.type === 'rapidFire') {
                    game.player.activateRapidFire();
                } else if (powerup.type === 'bomb') {
                    game.playAudio('bomb_pickup');
                    game.player.addBomb();
                }
            }
        });
    }
}