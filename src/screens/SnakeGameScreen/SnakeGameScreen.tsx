import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    PanResponder,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const GRID_SIZE = 20;
const BOARD_PADDING = 40;

// Calculate board size to ensure perfect grid alignment
const getBoardDimensions = () => {
  const screenWidth = Dimensions.get('window').width;
  const availableWidth = screenWidth - BOARD_PADDING;
  const cellSize = Math.floor(availableWidth / GRID_SIZE);
  const boardSize = cellSize * GRID_SIZE;
  return { boardSize, cellSize };
};

const { boardSize: BOARD_SIZE, cellSize: CELL_SIZE } = getBoardDimensions();

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const HIGH_SCORE_KEY = '@snake_game_high_score';

export default function SnakeGameScreen({ navigation }: { navigation: any }) {
  const { isDark } = useTheme();
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const directionRef = useRef<Direction>('RIGHT');
  const speedRef = useRef(300);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🎯 Food generator
  const generateFood = (snakeBody: Position[]) => {
    let pos: Position;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snakeBody.some(s => s.x === pos.x && s.y === pos.y));
    return pos;
  };

  // 🐍 Move snake
  const moveSnake = () => {
    setSnake(prev => {
      const head = prev[0];
      let newHead = { ...head };

      switch (directionRef.current) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
      }

      // Wall collision
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prev;
      }

      const body = [newHead, ...prev.slice(0, -1)];

      // Self collision
      for (let i = 1; i < body.length; i++) {
        if (body[i].x === newHead.x && body[i].y === newHead.y) {
          setGameOver(true);
          return prev;
        }
      }

      // Eat food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        speedRef.current = Math.max(80, speedRef.current - 15);
        setFood(generateFood(body));
        return [newHead, ...prev];
      }

      return body;
    });
  };

  // 📊 Load high score on mount
  useEffect(() => {
    const loadHighScore = async () => {
      try {
        const saved = await AsyncStorage.getItem(HIGH_SCORE_KEY);
        if (saved !== null) {
          setHighScore(parseInt(saved, 10));
        }
      } catch (error) {
        console.error('Error loading high score:', error);
      }
    };
    loadHighScore();
  }, []);

  // ⏱ Game loop
  useEffect(() => {
    if (gameOver || isPaused || !gameStarted || countdown !== null) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(moveSnake, speedRef.current);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameOver, isPaused, gameStarted, countdown, score]);

  // 🔢 Countdown logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setGameStarted(true);
    }

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [countdown]);

  // 💾 Save high score when game ends
  useEffect(() => {
    if (gameOver && score > highScore) {
      const saveHighScore = async () => {
        try {
          await AsyncStorage.setItem(HIGH_SCORE_KEY, score.toString());
          setHighScore(score);
        } catch (error) {
          console.error('Error saving high score:', error);
        }
      };
      saveHighScore();
    }
  }, [gameOver, score, highScore]);

  // 🖐 Swipe controls
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, g) => {
        if (!gameStarted || countdown !== null || gameOver || isPaused) return;
        
        const { dx, dy } = g;
        const threshold = 30;

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal swipe
          if (dx > threshold && directionRef.current !== 'LEFT') {
            directionRef.current = 'RIGHT';
          } else if (dx < -threshold && directionRef.current !== 'RIGHT') {
            directionRef.current = 'LEFT';
          }
        } else {
          // Vertical swipe
          if (dy > threshold && directionRef.current !== 'UP') {
            directionRef.current = 'DOWN';
          } else if (dy < -threshold && directionRef.current !== 'DOWN') {
            directionRef.current = 'UP';
          }
        }
      },
    })
  ).current;

  // 🔁 Reset
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setScore(0);
    speedRef.current = 300;
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(false);
    setCountdown(null);
  };

  // ▶️ Start game
  const startGame = () => {
    setCountdown(3);
  };

  // ⏸️ Toggle pause
  const togglePause = () => {
    if (!gameStarted || countdown !== null) return;
    setIsPaused(prev => !prev);
  };

  // 🎮 Button direction change
  const changeDirection = (dir: Direction) => {
    if (!gameStarted || countdown !== null || gameOver || isPaused) return;
    
    const opposite: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposite[directionRef.current] !== dir) {
      directionRef.current = dir;
    }
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#151718' : '#f5f5f5' }]} edges={['top']}>
      {/* Header with back button */}
      <View style={[styles.header, { 
        backgroundColor: isDark ? '#1E1E1E' : '#ffffff',
        borderBottomColor: isDark ? '#333' : '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { backgroundColor: isDark ? '#2C2C2E' : '#f0f0f0' }]}
        >
          <Ionicons name="arrow-back" size={20} color={isDark ? '#ECEDEE' : '#1a1a1a'} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
            🐍 Snake Game
          </Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.scoreBadge, { backgroundColor: isDark ? '#2C2C2E' : '#E8F5E9' }]}>
            <Ionicons name="trophy" size={14} color="#FFD700" style={styles.badgeIcon} />
            <Text style={[styles.scoreText, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}>
              {score}
            </Text>
          </View>
          {highScore > 0 && (
            <View style={[styles.highScoreBadge, { backgroundColor: isDark ? '#2C2C2E' : '#E3F2FD' }]}>
              <Text style={[styles.highScoreText, { color: isDark ? '#9BA1A6' : '#666' }]}>
                Best: {highScore}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.gameContainer}>
        {!gameOver && gameStarted && countdown === null && (
          <TouchableOpacity
            style={[styles.pauseButton, { 
              backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              shadowColor: '#000',
            }]}
            onPress={togglePause}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isPaused ? 'play' : 'pause'}
              size={24}
              color={isDark ? '#ECEDEE' : '#1a1a1a'}
            />
          </TouchableOpacity>
        )}
        <View style={styles.boardWrapper}>
          <View
            style={[
              styles.board,
              {
                backgroundColor: isDark ? '#0F1419' : '#F8F9FA',
                borderColor: isDark ? '#4CAF50' : '#4CAF50',
                shadowColor: '#4CAF50',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              },
            ]}
            {...panResponder.panHandlers}
          >
          {/* Grid lines */}
          {Array.from({ length: GRID_SIZE + 1 }, (_, i) => {
            const isLast = i === GRID_SIZE;
            return (
              <View
                key={`v-${i}`}
                style={[
                  styles.gridLineVertical,
                  {
                    left: isLast ? BOARD_SIZE - 1 : i * CELL_SIZE,
                    backgroundColor: isDark ? '#2A2A2A' : '#e8e8e8',
                  },
                ]}
              />
            );
          })}
          {Array.from({ length: GRID_SIZE + 1 }, (_, i) => {
            const isLast = i === GRID_SIZE;
            return (
              <View
                key={`h-${i}`}
                style={[
                  styles.gridLineHorizontal,
                  {
                    top: isLast ? BOARD_SIZE - 1 : i * CELL_SIZE,
                    backgroundColor: isDark ? '#2A2A2A' : '#e8e8e8',
                  },
                ]}
              />
            );
          })}

          {/* Snake */}
          {snake.map((seg, i) => (
            <View
              key={i}
              style={[
                styles.snake,
                i === 0 ? styles.snakeHead : styles.snakeBody,
                {
                  left: seg.x * CELL_SIZE,
                  top: seg.y * CELL_SIZE,
                  backgroundColor: i === 0 ? '#4CAF50' : '#66BB6A',
                  borderColor: i === 0 ? '#2E7D32' : '#43A047',
                },
              ]}
            >
              {i === 0 && (
                <View style={styles.snakeEyeContainer}>
                  <View style={[styles.snakeEye, { backgroundColor: '#1B5E20' }]} />
                  <View style={[styles.snakeEye, { backgroundColor: '#1B5E20' }]} />
                </View>
              )}
            </View>
          ))}

          {/* Food - Apple */}
          <Image
            source={require('../../../assets/images/appleicon.png')}
            style={[
              styles.food,
              {
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              },
            ]}
            resizeMode="contain"
          />
          </View>
        </View>
      </View>

      {/* 🎮 Controls */}
      <View style={[styles.controlsContainer, { backgroundColor: isDark ? '#151718' : '#f5f5f5' }]}>
        <View style={styles.controls}>
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[styles.controlButton, { 
                backgroundColor: isDark ? '#2E7D32' : '#4CAF50',
                shadowColor: '#4CAF50',
              }]}
              onPress={() => changeDirection('UP')}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-up" size={32} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[styles.controlButton, { 
                backgroundColor: isDark ? '#2E7D32' : '#4CAF50',
                shadowColor: '#4CAF50',
              }]}
              onPress={() => changeDirection('LEFT')}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={32} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.controlSpacer} />
            <TouchableOpacity
              style={[styles.controlButton, { 
                backgroundColor: isDark ? '#2E7D32' : '#4CAF50',
                shadowColor: '#4CAF50',
              }]}
              onPress={() => changeDirection('RIGHT')}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-forward" size={32} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={[styles.controlButton, { 
                backgroundColor: isDark ? '#2E7D32' : '#4CAF50',
                shadowColor: '#4CAF50',
              }]}
              onPress={() => changeDirection('DOWN')}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-down" size={32} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Start Screen */}
      {!gameStarted && countdown === null && !gameOver && (
        <View style={styles.startOverlay}>
          <View
            style={[
              styles.startCard,
              { backgroundColor: isDark ? '#1E1E1E' : '#ffffff' },
            ]}
          >
            <Text
              style={[styles.startTitle, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}
            >
              Snake Game
            </Text>
            {highScore > 0 && (
              <Text
                style={[styles.highScoreDisplay, { color: isDark ? '#9BA1A6' : '#666' }]}
              >
                Best Score: {highScore}
              </Text>
            )}
            <TouchableOpacity
              style={[styles.playButton, { backgroundColor: '#4CAF50' }]}
              onPress={startGame}
            >
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Countdown Screen */}
      {countdown !== null && countdown > 0 && (
        <View style={styles.countdownOverlay}>
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <View style={styles.gameOverOverlay}>
          <View
            style={[
              styles.gameOverCard,
              { backgroundColor: isDark ? '#1E1E1E' : '#ffffff' },
            ]}
          >
            <Text
              style={[styles.gameOverTitle, { color: isDark ? '#ECEDEE' : '#1a1a1a' }]}
            >
              Game Over!
            </Text>
            <Text
              style={[styles.gameOverScore, { color: isDark ? '#9BA1A6' : '#666' }]}
            >
              Final Score: {score}
            </Text>
            {score >= highScore && score > 0 && (
              <Text
                style={[styles.newHighScore, { color: '#FFD700' }]}
              >
                🎉 New High Score! 🎉
              </Text>
            )}
            <Text
              style={[styles.highScoreDisplay, { color: isDark ? '#9BA1A6' : '#666' }]}
            >
              Best Score: {highScore}
            </Text>
            <TouchableOpacity
              style={[styles.restartButton, { backgroundColor: '#4CAF50' }]}
              onPress={resetGame}
            >
              <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerRight: {
    width: 100,
    alignItems: 'flex-end',
    gap: 6,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  badgeIcon: {
    marginRight: 2,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
  },
  highScoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  highScoreText: {
    fontSize: 11,
    fontWeight: '600',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  pauseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boardWrapper: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    position: 'relative',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderWidth: 3,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  gridLineVertical: {
    position: 'absolute',
    width: 1,
    height: BOARD_SIZE,
    top: 0,
  },
  gridLineHorizontal: {
    position: 'absolute',
    height: 1,
    width: BOARD_SIZE,
    left: 0,
  },
  snake: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 4,
    borderWidth: 1.5,
  },
  snakeHead: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  snakeBody: {
    borderRadius: 3,
    borderWidth: 1,
  },
  snakeEyeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: -2,
  },
  snakeEye: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  food: {
    position: 'absolute',
  },
  controlsContainer: {
    padding: 24,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  controls: {
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  controlButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  controlSpacer: {
    width: 70,
    marginHorizontal: 10,
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  gameOverCard: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 280,
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  gameOverTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  gameOverScore: {
    fontSize: 18,
    marginBottom: 8,
  },
  newHighScore: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  highScoreDisplay: {
    fontSize: 16,
    marginBottom: 20,
  },
  restartButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  startOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  startCard: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 280,
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  startTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  playButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  countdownText: {
    fontSize: 140,
    fontWeight: '900',
    color: '#4CAF50',
    textShadowColor: 'rgba(76, 175, 80, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
});
