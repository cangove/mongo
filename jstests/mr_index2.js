
t = db.mr_index2;
t.drop()

t.save( { arr : [1, 2] } ) 

map = function() { emit(this._id, 1) } 
reduce = function(k,vals) { return Array.sum( vals ); }

res = t.mapReduce(map,reduce, { query : {} }) 
assert.eq( 1 ,res.counts.input , "A" )


res = t.mapReduce(map,reduce, { query : { arr: {$gte:0} } }) 
assert.eq( 1 ,res.counts.input , "B" )

t.ensureIndex({arr:1}) 
res = t.mapReduce(map,reduce, { query : { arr: {$gte:0} } }) 
assert.eq( 1 ,res.counts.input , "C" )

