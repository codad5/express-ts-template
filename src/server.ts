import moduleAlias from 'module-alias'
import path from 'path'

// set module-alias for absolute path @
moduleAlias.addAliases({
    '@': path.resolve('./' + (process.env.NODE_ENV == 'production' ? 'dist' : 'src'))
})

moduleAlias()

import App from "@/src/index"
import UserRouter from '@/src/routes/user'

const app = new App()
app.useRoute('/user',UserRouter)
.closeMongoose()
.closeRedis()
.start(5000)

