const User = require('../models/User');
exports.getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const { fields, includePosts, includeFriends } = req.query;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ error: 'Invalid username format' });
        }
        let fieldProjection = {};
        if (fields) {
            fields.split(',').forEach(field => {
                fieldProjection[field] = 1;
            });
        }
        let user = await User.findOne({ username }, fieldProjection);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (includePosts === 'true') {
            user = user.toObject();
            user.posts = [
                { post_id: '12345', content: 'Had a great day!', timestamp: new Date() }
            ];
        }
        if (includeFriends === 'true') {
            user = user.toObject();
            user.friends = [
                { username: '_karanubale_', name: 'karan ubale' }
            ];
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
