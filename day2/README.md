# day 3

## CRUD realisation
---
Here key point is realisation Create+Read+Update+Delete structure.

### Main things 

- 'contriller' where we specifieing methods for data response in JSON format
- 'routes' where you apply some specific controller to one route
- in app.js you just grab this routing and apply to one specific route
```
app.use('/', postRoures);
```
Like this, and now all routes specified in 'postRoutes' will be used for root '/'; 


### After that connect mongoose and set it up
i will do that in day 2 but it's day3, then and day3 i will replecate it without help in vim from scratch.