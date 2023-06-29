import App from "@/src/index"
import UserRouter from '@/src/routes/user'

const app = new App()
app.useRoute('/user',UserRouter)
.closeMongoose()
.closeRedis()
.start(5000)

