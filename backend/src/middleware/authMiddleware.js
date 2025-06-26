import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const basicAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Missing or malformed Authorization header' });
  }

  try {
    const base64Credentials = authHeader.split(' ')[1];
    const decoded = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = decoded.split(':');

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.user = { id: user._id, username: user.username }

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};
