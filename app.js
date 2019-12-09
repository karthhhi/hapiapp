const Hapi = require('hapi');
const Inert = require('inert');

const port = process.env.PORT || 8000;

const server = Hapi.server({ port: port, host: 'localhost' });


server.route({ 
    method: 'GET', 
    path: '/', 
    handler: (req, h) => { 
        return h.response('The page was not found').code(404);
        return '<h1>ok</h1>';
    }
});

server.route({ 
    method: 'GET', 
    path: '/test/{name}', 
    handler: (req, h) => { 
        // return h.response('The page was not found').code(404);
        return `<h1>${req.params.name}</h1>`;
    }
});

// server.register(require('inert'), err => {
//     if(err){
//         throw err;
//     }
    
//     server.route({ 
//         method: 'GET', 
//         path: '/img', 
//         handler: {
//             file: 'page.html'
//         }
//     });
// });


const provision = async () => {

    await server.register(Inert);

    // server.route({ 
    //     method: 'GET', 
    //     path: '/img', 
    //     handler: {
    //         file: 'page.html'
    //     }
    // });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();

server.start((err)=>{
    if(err){
        throw err;
    }
    console.log('Server started in 8000')
})