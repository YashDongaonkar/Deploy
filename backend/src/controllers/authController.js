import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" })
    }

    const userExists = await User.findOne({ username })
    if (userExists) {
      return res.status(409).json({ message: "Username already taken" })
    }

    const newUser = new User({ username, password })
    await newUser.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ message: "Server error" })
  }
}

export const login = async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" })
    }

    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" })
    }

    res.status(200).json({ message: "Login successful", username })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ message: "Server error" })
  }
}
