¿Qué sucedio al usar async y await?
funciona similar a como estaba previamente, sin embargo ahora funciona de forma asincrona y resuelve la promesa con un timer, y al final de la ejecucion del programa me muestra todos los mensajes de "resolve" acumulados

¿Qué sucedio al usar el método then()?
al llamar la promesa se tuvo que declarar el metodo, pero de mismo modo resuelve la promesa con un timer, y al final de la ejecucion del programa me muestra todos los mensajes de "resolve" acumulados

¿Qué diferencias encontraste entre async, await y el método then()?
con async/await hay que crear una funcion nueva donde se llama a la promesa con try/catch (try para la resolucion, catch por si hay error), para luego llamar a este metodo
con .then() hay que llamar la funcion normal con la promesa y luego agregarle then/catch para mostrar que se soluciono o si hubo error