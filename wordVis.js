

function process(data){
    var dict = {};
    for(var obj in data){
        //console.log(obj);
        var key = data[obj].original;
        if (key in dict){
            var auxObj = dict[key];
            var vec = auxObj.vec;
            auxObj.total = parseInt(auxObj.total)+parseInt(data[obj].count); 
            var aux = {};
            aux.abbr = data[obj].abbreviation;
            aux.count = data[obj].count;
            vec.push(aux);
            auxObj.vec = vec;
            dict[key] = auxObj;
        }else{
            dict[key] ={total:data[obj].count, vec: [{abbr:data[obj].abbreviation, count:data[obj].count}]};
        }
    }    
    return dict;    
}

function process2(data){
    var dict = {};
    for(var obj in data){
        //console.log(obj);
        var key = data[obj].original;
        if (key in dict){
            var auxObj = dict[key];
            var vec = auxObj.vec;
            auxObj.total = parseInt(auxObj.total)+parseInt(data[obj].count); 
            var aux = {};
            aux.abbr = data[obj].abbreviation;
            aux.count = data[obj].count;
            aux.acc = data[obj].accuracy;
            vec.push(aux);
            auxObj.vec = vec;
            dict[key] = auxObj;
        }else{
            dict[key] ={total:data[obj].count, vec: [{abbr:data[obj].abbreviation, count:data[obj].count, acc:data[obj].accuracy}]};
        }
    }    
    return dict;    
}

function calcAccuracy(accuracy){
    
    var correct = wrong = score = 0;
    for (x in accuracy){        
        switch(x) {
            case "correct":
            case "semantic":
            case "plural":
            case "typo":
                correct += parseInt(accuracy[x]);
                break;
            default:
                wrong += parseInt(accuracy[x]);
        }
    }
    score = parseFloat(correct/(correct+wrong));
    if (isNaN(score))
        return 0;
    return score;
    
}


function processRank(data){
    var dict = {};
    for(var obj in data){
        //console.log(obj);
        var key = data[obj].digraph;
        dict[key] ={count:data[obj].count, freq: data[obj].freq, rank: data[obj].rank};
    }    
    return dict;    
}

function processMonograph(data){
    var dict = {};
    for(var obj in data){
        //console.log(obj);
        var key = data[obj].letter;
        dict[key] ={count:data[obj].rank, rank: data[obj].freq};
    }    
    return dict;    
}





function statsMatrixBigraph(data, alpha){
    var set = {};
    
    for(var a in alpha){        
        for(var b in alpha[a].pair){
            var search = a+b;
            for(var key in data){ 
                var k = key.toUpperCase();
                var max = k.split(search).length-1;
                alpha[a].pair[b].max += max*data[key].total;
                var vec = data[key].vec;
                for(var v in vec){
                    var ab = vec[v].abbr.toUpperCase();
                    var n = ab.split(search).length-1;
                    n = n-max;                  
                                     
                    if (n>0){
                        alpha[a].pair[b].add += n*vec[v].count;
                    }else if (n==0 && max!=0){
                        alpha[a].pair[b].kept+=parseInt(vec[v].count);
                    }else if(n<0){
                        alpha[a].pair[b].drop += (-1*n)*vec[v].count;
//                        if (vec[v].acc in alpha[a].pair[b].accuracy)
//                            alpha[a].pair[b].accuracy[vec[v].acc] += parseInt(vec[v].count);
//                        else
//                            alpha[a].pair[b].accuracy[vec[v].acc] = parseInt(vec[v].count);
                    }                       
                }
            } 
        }
    }
    for(var key in data){ 
        var k = key.toUpperCase();        
        var vec = data[key].vec;
        for(var v in vec){
            var ab = vec[v].abbr.toUpperCase();
            
            var index = 1;
            for(var i=1; (i<k.length) && (index<ab.length);i++){
                if (k[i]==ab[index]){
                    index++;
                }else{
                    alpha[k[i-1]].pair[k[i]].dropAfter += parseInt(vec[v].count);
                    if (vec[v].acc in alpha[k[i-1]].pair[k[i]].accuracy)
                            alpha[k[i-1]].pair[k[i]].accuracy[vec[v].acc] += parseInt(vec[v].count);
                        else
                            alpha[k[i-1]].pair[k[i]].accuracy[vec[v].acc] = parseInt(vec[v].count);
                }
            }
           // console.log();       
        }
            
    }
        
//    console.log(alpha);            
    return alpha;
}

function statsMatrix(data, alpha){
    var set = {};
    
    for(var a in alpha){        
        for(var b in alpha[a].pair){
            var search = a+b;
            for(var key in data){ 
                var k = key.toUpperCase();
                var max = k.split(search).length-1;
                alpha[a].pair[b].max += max*data[key].total;
                var vec = data[key].vec;
                for(var v in vec){
                    var ab = vec[v].abbr.toUpperCase();
                    var n = ab.split(search).length-1;
                    n = n-max;
                    if (n>0){
                        alpha[a].pair[b].add += n*vec[v].count;
                    }else if (n==0 && max!=0){
                        alpha[a].pair[b].kept+=parseInt(vec[v].count);
                    }else if(n<0){
                        alpha[a].pair[b].drop += (-1*n)*vec[v].count;
                        if (vec[v].acc in alpha[a].pair[b].accuracy)
                            alpha[a].pair[b].accuracy[vec[v].acc] += parseInt(vec[v].count);
                        else
                            alpha[a].pair[b].accuracy[vec[v].acc] = parseInt(vec[v].count);
                    }                       
                }
            } 
        }
    }         
    console.log(alpha);            
    return alpha;
}


/*
function statsMatrix(data, alpha){
    var set = {};
    
    for(var a in alpha){        
        for(var b in alpha[a].pair){
            var search = a+b;
            for(var key in data){ 
                var k = key.toUpperCase();
                var max = k.split(search).length-1;
                alpha[a].pair[b].max += max*data[key].total;
                var vec = data[key].vec;
                for(var v in vec){
                    var ab = vec[v].abbr.toUpperCase();
                    var n = ab.split(search).length-1;
                    n = n-max;
                    if (n>0){
                        alpha[a].pair[b].add += n*vec[v].count;
                    }else if (n==0 && max!=0){
                        alpha[a].pair[b].kept+=parseInt(vec[v].count);
                    }else if(n<0){
                        alpha[a].pair[b].drop += (-1*n)*vec[v].count;    
                    }                       
                }
               // console.log(key);

            } 
        }
    }         
    console.log(alpha);            
    return alpha;
}*/ 


//academically
function comPair(word, abbr, alpha){
    var i=0, result = {};
    word = word.toUpperCase();
    abbr = abbr.toUpperCase();
    for(var w in word){
        if (word[w]==abbr[i]){
            
        }
        
    }
    
}


function getLabels(label){
    var alpha = {};
    for (var l in label){
        var dict = {};
        for (var lb in label){
            dict[label[lb]] = {drop:0, dropAfter:0, add:0, kept:0, max:0, accuracy:{}};
        }
        alpha[label[l]] = {pair:dict};
    }
    //console.log(alpha);
    return alpha;
}