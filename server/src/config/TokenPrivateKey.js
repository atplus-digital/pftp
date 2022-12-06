import crypto from "crypto"

export  const TokenPrivateKey =  process.env.PRIVATE_KEY || crypto.randomBytes(256).toString('base64')
