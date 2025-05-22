// 删除评论
app.delete('/api/comments/:timestamp', async (req, res) => {
  try {
    const { timestamp } = req.params;
    const { username } = req.body; // 从请求体中获取用户名

    // 获取所有评论
    const comments = await redis.lrange(COMMENT_KEY, 0, -1);
    const parsedComments = comments.map(comment => JSON.parse(comment));
    
    // 找到要删除的评论
    const commentToDelete = parsedComments.find(comment => 
      comment.time.toString() === timestamp && comment.username === username
    );

    if (!commentToDelete) {
      return res.status(404).json({ error: '评论不存在或无权删除' });
    }

    // 删除评论并重新存储
    const updatedComments = parsedComments.filter(comment => 
      !(comment.time.toString() === timestamp && comment.username === username)
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