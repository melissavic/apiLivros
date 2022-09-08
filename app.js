 // Import da biblioteca do express
 const express = require('express')

 // Import da biblioteca do cors 
  const cors = require('cors')

// Import da biblioteca do body-parser
const bodyParser = require('body-parser') 

const {getLivro} = require('./modulos/livros.js')
const { response } = require('express')

const app = express()


     //request - recebe dados 
     // response - devolve dados
     app.use((request,response, next) => {
        //Permite especificar quem serão os IPs que podem acessar a API (* - significa todos)  
        response.header('Acces-Control-Allow-Origin', '*' )
         // Permite especificar quais serao os verbos (metodos) que a API irá reconhecer
        response.header('Acces-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
  
        // Estabelece que as permissoes acima serao representadas pelo cors
        app.use(cors())
  
        next()
  
       })

       //Endpoint Listagem de livros 
       app.get('/livros/:book', cors(), async function(request,response,next){
            let chave = request.params.book
            let livros = getLivro(chave)
         
            if(livros){
                response.status(200)
                response.json(livros)
            } else {
                response.status(404)
            }

       })
 
       app.listen(8080, function(){
        console.log('Servidor aguardando requisiçoes.')
    })