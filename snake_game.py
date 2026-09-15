"""
贪吃蛇 — 用方向键控制
空格暂停，R 重新开始，Esc 退出
（纯 Python 自带库，无需额外安装）
"""
import turtle
import random
import time

# ============ 设置 ============
CELL = 20
W = 24 * CELL   # 宽
H = 18 * CELL   # 高
SPEED = 80      # 毫秒/帧（越小越快）

# ============ 初始化画面 ============
screen = turtle.Screen()
screen.setup(W + 40, H + 40)
screen.bgcolor("#1a1a2e")
screen.title("贪吃蛇")
screen.tracer(0)  # 关闭自动刷新，手动控制动画

# ============ 画笔（用来画蛇、食物、文字）============
pen = turtle.Turtle()
pen.hideturtle()
pen.speed(0)
pen.penup()


def draw_square(x, y, color, size=CELL):
    """在 (x,y) 画一个正方形（以格子中心为基准）"""
    pen.goto(x - size // 2, y - size // 2)
    pen.pendown()
    pen.fillcolor(color)
    pen.begin_fill()
    for _ in range(4):
        pen.forward(size - 1)
        pen.left(90)
    pen.end_fill()
    pen.penup()


def draw_text(text, size, y, color="white"):
    """在屏幕中央 y 位置写字"""
    pen.goto(0, y)
    pen.color(color)
    pen.write(text, align="center", font=("Microsoft YaHei", size, "bold"))


# ============ 蛇和食物数据 ============
COLS = W // CELL   # 24
ROWS = H // CELL   # 18

snake = [(COLS // 2, ROWS // 2)]  # 蛇身，蛇头在最前面
direction = (1, 0)   # 当前移动方向
next_dir = (1, 0)    # 下一帧方向（用于防止一帧内反转）
food = (COLS // 3, ROWS // 2)
score = 0
paused = False
game_over = False


def random_food():
    while True:
        pos = (random.randint(0, COLS - 1), random.randint(0, ROWS - 1))
        if pos not in snake:
            return pos


def reset_game():
    global snake, direction, next_dir, food, score, paused, game_over
    snake = [(COLS // 2, ROWS // 2)]
    direction = (1, 0)
    next_dir = (1, 0)
    food = random_food()
    score = 0
    paused = False
    game_over = False


# ============ 键盘事件 ============
def on_key_up():
    global next_dir, game_over
    if not game_over and direction != (0, 1):
        next_dir = (0, -1)


def on_key_down():
    global next_dir, game_over
    if not game_over and direction != (0, -1):
        next_dir = (0, 1)


def on_key_left():
    global next_dir, game_over
    if not game_over and direction != (1, 0):
        next_dir = (-1, 0)


def on_key_right():
    global next_dir, game_over
    if not game_over and direction != (-1, 0):
        next_dir = (1, 0)


def on_key_space():
    global paused, game_over
    if not game_over:
        paused = not paused


def on_key_r():
    global game_over
    if game_over:
        reset_game()


def on_key_esc():
    screen.bye()


screen.listen()
screen.onkey(on_key_up, "Up")
screen.onkey(on_key_down, "Down")
screen.onkey(on_key_left, "Left")
screen.onkey(on_key_right, "Right")
screen.onkey(on_key_up, "w")
screen.onkey(on_key_up, "W")
screen.onkey(on_key_down, "s")
screen.onkey(on_key_down, "S")
screen.onkey(on_key_left, "a")
screen.onkey(on_key_left, "A")
screen.onkey(on_key_right, "d")
screen.onkey(on_key_right, "D")
screen.onkey(on_key_space, "space")
screen.onkey(on_key_r, "r")
screen.onkey(on_key_r, "R")
screen.onkey(on_key_esc, "Escape")


# ============ 主游戏循环 ============
def game_loop():
    global direction, food, score, game_over, paused

    pen.clear()

    # ---- 计算蛇头像素坐标用于画格子 ----
    def grid_x(col): return col * CELL - W // 2
    def grid_y(row): return H // 2 - row * CELL

    # ---- 画食物 ----
    fx = grid_x(food[0]) + CELL // 2
    fy = grid_y(food[1]) - CELL // 2
    draw_square(fx, fy, "#e74c3c")

    # ---- 画蛇 ----
    for i, (col, row) in enumerate(snake):
        sx = grid_x(col) + CELL // 2
        sy = grid_y(row) - CELL // 2
        color = "#2ecc71" if i == 0 else "#27ae60"
        draw_square(sx, sy, color)

    # ---- 分数 ----
    pen.goto(-W // 2 + 10, H // 2 - 25)
    pen.color("white")
    pen.write(f"得分: {score}", font=("Microsoft YaHei", 14, "bold"))

    # ---- 暂停提示 ----
    if paused:
        draw_text("暂停中", 36, 20)
        draw_text("按空格继续", 18, -30)

    # ---- 结束提示 ----
    if game_over:
        draw_text("游戏结束!", 36, 50)
        draw_text(f"得分: {score}", 22, 0)
        draw_text("按 R 重新开始", 18, -50)

    screen.update()

    # ---- 暂停或结束时跳过移动逻辑 ----
    if paused or game_over:
        screen.ontimer(game_loop, SPEED)
        return

    # ---- 更新方向 ----
    direction = next_dir

    # ---- 移动蛇 ----
    head = snake[0]
    new_head = (head[0] + direction[0], head[1] + direction[1])

    # 撞墙
    if not (0 <= new_head[0] < COLS and 0 <= new_head[1] < ROWS):
        game_over = True
        screen.ontimer(game_loop, SPEED)
        return

    # 撞自己
    if new_head in snake:
        game_over = True
        screen.ontimer(game_loop, SPEED)
        return

    snake.insert(0, new_head)

    # 吃食物
    if new_head == food:
        score += 10
        food = random_food()
    else:
        snake.pop()

    screen.ontimer(game_loop, SPEED)


# ============ 启动 ============
game_loop()
screen.mainloop()
