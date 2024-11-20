import express from 'express'
import cookie from 'cookie-parser'
import cors from 'cors'

const app=express()

app.use(cookie())

app.use(express.json());