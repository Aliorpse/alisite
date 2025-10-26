---
title: "个人编程农场迷宫解法"
date: 2025-10-25
tags: ["编程农场", "python"]
description: "采用 DFS 建立地图 + 双向BFS搜索"
image: "https://i1.hdslb.com/bfs/archive/f874e33e8f594dc1e885fcf5466b549aaa652e9c.jpg"
---

代码修改自 https://www.bilibili.com/opus/1123479336296382467

```python
def get_opposite(direction):
	if direction == North:
		return South
	elif direction == South:
		return North
	elif direction == East:
		return West
	elif direction == West:
		return East

def calculate_next_pos(pos, direction):
	x, y = pos
	if direction == North:
		return (x, y + 1)
	elif direction == South:
		return (x, y - 1)
	elif direction == East:
		return (x + 1, y)
	elif direction == West:
		return (x - 1, y)
	return pos

def merge_paths_bidirectional(start, goal, meeting_point, parent_forward, parent_backward):
	forward_path = []
	node = meeting_point
	while node in parent_forward:
		parent_node, direction = parent_forward[node]
		forward_path.append(direction)
		node = parent_node
	
	reversed_forward = []
	for i in range(len(forward_path) - 1, -1, -1):
		reversed_forward.append(forward_path[i])
	
	backward_path = []
	node = meeting_point
	while node in parent_backward:
		parent_node, direction = parent_backward[node]
		opposite_dir = get_opposite(direction)
		backward_path.append(opposite_dir)
		node = parent_node
	
	full_path = []
	for d in reversed_forward:
		full_path.append(d)
	for d in backward_path:
		full_path.append(d)
	
	return full_path

def find_path_bidirectional_bfs(maze_map, start, goal, treasure_count):
	start_tick = get_tick_count()

	if start == goal:
		return ([], 0)

	queue_forward = [start]
	head_f = 0
	visited_forward = {start: True}
	parent_forward = {}

	queue_backward = [goal]
	head_b = 0
	visited_backward = {goal: True}
	parent_backward = {}

	nodes_visited = 0

	while head_f < len(queue_forward) and head_b < len(queue_backward):
		if (len(queue_forward) - head_f) <= (len(queue_backward) - head_b):
			current = queue_forward[head_f]
			head_f = head_f + 1
			nodes_visited = nodes_visited + 1

			if current in visited_backward:
				path = merge_paths_bidirectional(start, goal, current, parent_forward, parent_backward)
				end_tick = get_tick_count()
				ticks_used = end_tick - start_tick
				quick_print("第", treasure_count, "次 | 访问节点:", nodes_visited, "| 消耗ticks:", ticks_used)
				return (path, ticks_used)

			if current in maze_map:
				mz = maze_map[current]
				for direction in [North, East, South, West]:
					if direction in mz and mz[direction]:
						next_pos = calculate_next_pos(current, direction)
						if next_pos in visited_forward:
							continue
						if next_pos in visited_backward:
							parent_forward[next_pos] = (current, direction)
							path = merge_paths_bidirectional(start, goal, next_pos, parent_forward, parent_backward)
							end_tick = get_tick_count()
							ticks_used = end_tick - start_tick
							quick_print("第", treasure_count, "次 | 访问节点:", nodes_visited, "| 消耗ticks:", ticks_used)
							return (path, ticks_used)
						visited_forward[next_pos] = True
						parent_forward[next_pos] = (current, direction)
						queue_forward.append(next_pos)
		else:
			current = queue_backward[head_b]
			head_b = head_b + 1
			nodes_visited = nodes_visited + 1

			if current in visited_forward:
				path = merge_paths_bidirectional(start, goal, current, parent_forward, parent_backward)
				end_tick = get_tick_count()
				ticks_used = end_tick - start_tick
				quick_print("第", treasure_count, "次 | 访问节点:", nodes_visited, "| 消耗ticks:", ticks_used)
				return (path, ticks_used)

			if current in maze_map:
				mz = maze_map[current]
				for direction in [North, East, South, West]:
					if direction in mz and mz[direction]:
						next_pos = calculate_next_pos(current, direction)
						if next_pos in visited_backward:
							continue
						if next_pos in visited_forward:
							parent_backward[next_pos] = (current, direction)
							path = merge_paths_bidirectional(start, goal, next_pos, parent_forward, parent_backward)
							end_tick = get_tick_count()
							ticks_used = end_tick - start_tick
							quick_print("第", treasure_count, "次 | 访问节点:", nodes_visited, "| 消耗ticks:", ticks_used)
							return (path, ticks_used)
						visited_backward[next_pos] = True
						parent_backward[next_pos] = (current, direction)
						queue_backward.append(next_pos)

	return (None, 0)

def update_map(maze_map):
	pos = (get_pos_x(), get_pos_y())
	if pos not in maze_map:
		maze_map[pos] = {}
	for direction in [North, East, South, West]:
		if can_move(direction):
			maze_map[pos][direction] = True

def move_along_path_bfs(path, maze_map):
	for direction in path:
		move(direction)
		update_map(maze_map)

def solve_bidirectional_bfs(maze_map, treasure_count):
	update_map(maze_map)
	treasure_x, treasure_y = measure()
	treasure_pos = (treasure_x, treasure_y)
	current_pos = (get_pos_x(), get_pos_y())
	
	if current_pos == treasure_pos:
		return 0
	
	result = find_path_bidirectional_bfs(maze_map, current_pos, treasure_pos, treasure_count)
	path = result[0]
	ticks_used = result[1]
	
	if path:
		move_along_path_bfs(path, maze_map)
	
	return ticks_used

def build_map(maze_map, visited):
	pos = (get_pos_x(), get_pos_y())
	if pos in visited:
		return
	visited[pos] = True
	
	if pos not in maze_map:
		maze_map[pos] = {}
	
	for direction in [North, East, South, West]:
		can_go = can_move(direction)
		maze_map[pos][direction] = can_go
		
		if can_go:
			next_pos = calculate_next_pos(pos, direction)
			if next_pos not in visited:
				move(direction)
				build_map(maze_map, visited)
				move(get_opposite(direction))

def create_maze_size(size):
	plant(Entities.Bush)
	substance_amount = size * 2**(num_unlocked(Unlocks.Mazes) - 1)
	use_item(Items.Weird_Substance, substance_amount)
	return substance_amount

def main(size):
	while True:
		quick_print("开始建立地图")
		substance_amount = create_maze_size(size)
		maze_map = {}
		visited = {}
		build_map(maze_map, visited)
		
		current_pos = (get_pos_x(), get_pos_y())
		if current_pos != (0, 0):
			result = find_path_bidirectional_bfs(maze_map, current_pos, (0, 0), 0)
			path = result[0]
			if path:
				move_along_path_bfs(path, maze_map)
		
		quick_print("地图建立完成")
		
		treasure_count = 0

		while True:
			treasure_count += 1
			solve_bidirectional_bfs(maze_map, treasure_count)

			if treasure_count % 300 == 0:
				quick_print("准备收获")
				harvest()
				clear()
				break
			
			use_item(Items.Weird_Substance, substance_amount)

clear()
main(12)
```
