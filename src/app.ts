//importar o express
import * as express from 'express';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { Product } from './entity/product';
import * as ampq from 'amqplib/callback_api'


createConnection().then(db => {

    //do model criar um repositorio
    const productRepository = db.getRepository(Product)

    ampq.connect('amqps://ibalqlol:w_CUD7SWFGW5qkOqEPrKPBbZHIXxpYLj@jackal.rmq.cloudamqp.com/ibalqlol', (error0, connection)=>{
        if(error0){
            throw error0
        }

        connection.createChannel((error1, channel)=>{
            if(error1){
                throw error1
            }

            //criar a aplicação express
    const app = express();

    //resolver o cors para o front - resolver json
    app.use(cors({origin: 'http://localhost:3000'}));
    app.use(express.json());


    //endpoints
    app.get('/api/products', async (req: Request, res: Response)=>{

        //buscar todos os produtos
        const products = await productRepository.find()

        //retornar os produtos
        res.json(products)
    })

    app.post('/api/products', async(req: Request, res: Response)=>{

        //registrar um novo produto
        const product = await productRepository.create(req.body)

        //salvar no banco
        const result = await productRepository.save(product)

        //testar o rabbit enviando um evento passando com primeiro parametro o nome
        channel.sendToQueue('product_creater', Buffer.from(JSON.stringify(result)))

        return res.send(result)
    })

    app.get('/api/products/:id', async(req: Request, res: Response)=>{

        const { idParams } = req.params

        const id = parseInt(idParams)
 
        //pegar por id no banco de dados
        const product = await productRepository.findOneBy({id: id});

        return res.send({product})

    })

    app.put('/api/products/:id', async(req: Request, res: Response)=>{

        const { idparams } = req.params

        const id = parseInt(idparams)

        const product = await productRepository.findOneBy({id: id})

        productRepository.merge(product, req.body)


        try{

            const result = await productRepository.save(product)

            //testar o rabbit enviando um evento passando com primeiro parametro o nome
            channel.sendToQueue('product_updated', Buffer.from(JSON.stringify(result)))

            return res.send(result)

        }catch(error){

            res.send(error)

        }  
    })

    app.delete('/api/products/:id', async (req: Request, res: Response)=>{

        const { idParams } = req.params

        const id = parseInt(idParams)

        try{

            const result = await productRepository.delete(id)

            //testar o rabbit enviando um evento passando com primeiro parametro o nome
            channel.sendToQueue('product_deleted', Buffer.from(req.params.id))

            res.send({result})

        }catch(err){

            res.send(err)
        }
    })

    app.post('/api/products/:id/like', async (req:Request, res: Response)=>{

        const { idParam } = req.params

        const id = parseInt(idParam)

        const product = await productRepository.findOneBy({id: id})

        product.likes++

        try{

            const result = await productRepository.save(product)

            res.send({result})

        }catch(err){

            res.send(err)
        }
       })

    //escutar a porta de backend
    app.listen(5000, ()=> console.log('Servidor na porta 5000'))

    //fechar a conexão
    process.on('beforeExit', ()=>{

        connection.close()
    })
        })
    })

    
})


