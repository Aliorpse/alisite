const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');
const app = express();

// Redis配置
const redis = new Redis({
  host: 'aliorpse.tech',
  port: 6379,
  password: 'Ali081023',
});

const COMMENT_KEY = 'aliste:blog:commentData';

// 中间件
app.use(cors());
app.use(express.json());

// 获取所有评论
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await redis.lrange(COMMENT_KEY, 0, -1);
    const parsedComments = comments.map(comment => JSON.parse(comment));
    res.json(parsedComments);
  } catch (error) {
    console.error('获取评论失败:', error);
    res.status(500).json({ error: '获取评论失败' });
  }
});

// 添加新评论
app.post('/api/comments', async (req, res) => {
  try {
    const { userId, username, avatar, content } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: '用户ID不能为空' });
    }

    const comment = {
      userId,
      username,
      avatar,
      content,
      time: Math.floor(Date.now() / 1000), // Unix时间戳
    };
    
    await redis.lpush(COMMENT_KEY, JSON.stringify(comment));
    res.json(comment);
  } catch (error) {
    console.error('添加评论失败:', error);
    res.status(500).json({ error: '添加评论失败' });
  }
});

// 删除评论
app.delete('/api/comments/:timestamp', async (req, res) => {
  try {
    const { timestamp } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: '用户ID不能为空' });
    }

    // 获取所有评论
    const comments = await redis.lrange(COMMENT_KEY, 0, -1);
    const parsedComments = comments.map(comment => JSON.parse(comment));
    
    // 找到要删除的评论
    const commentToDelete = parsedComments.find(comment => 
      comment.time.toString() === timestamp && comment.userId === userId
    );

    if (!commentToDelete) {
      return res.status(404).json({ error: '评论不存在或无权删除' });
    }

    // 删除评论并重新存储
    const updatedComments = parsedComments.filter(comment => 
      !(comment.time.toString() === timestamp && comment.userId === userId)
    );

    // 清空并重新存储评论列表
    await redis.del(COMMENT_KEY);
    if (updatedComments.length > 0) {
      await redis.rpush(COMMENT_KEY, ...updatedComments.map(comment => JSON.stringify(comment)));
    }

    res.json({ success: true });
  } catch (error) {
    console.error('删除评论失败:', error);
    res.status(500).json({ error: '删除评论失败' });
  }
}); 

const PORT = 32053;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
}); 