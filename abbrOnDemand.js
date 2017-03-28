function abbreviateCamelCase(word, size, alpha, digraph, monograph, correlationMatrix, dropProb, labels){
    var letters = [];
    
    var total=0;
    for (a in alpha){
        for(b in alpha[a].pair){
            total+= parseInt(alpha[a].pair[b].max);
        }
    }

    var dropped = [];
    var scale = getDropProb(dropProb, word.length);
    
    for (var w=0; w<word.length;w++){
        var l = word[w].toUpperCase();
        
        if(word[w]==l){
            var score = 0.0;
        }else{
            if (w==0){
                var score = parseFloat(monograph[word[w].rank]*(1-scale[w]/100));                
            }else{                                    
                var score = parseFloat(correlationMatrix[labels.indexOf(word[w-1].toUpperCase())][labels.indexOf(l)] * (1-scale[w]/100));
            }
        }
        
        var letter = {char: word[w], mono: score, deleted: 0};
        
        if (isNaN(letter.mono))
            letter.mono = -1;

        dropped.push(letter);        
    }
//    console.log(dropped);
    
    
    var i=0, str="";
    
//    str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));

    while((countNonDeleted(dropped)>size) && (countNonDeleted(dropped)>0) && (i<countNonDeleted(dropped))){
        i++;
        var max = -1;
        for (var i=0; (max==-1 && i<dropped.length); i++){
            if (dropped[i].deleted==0)
                max = i;
        }
        
        for (a in dropped ){
            if ((dropped[a].deleted==0)&&(dropped[a].mono>=dropped[max].mono)){
                max = a;
            }
        }
        dropped[max].deleted = 1;
        
//        str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));
    }
//    str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));
//    $("#word").html($("#word").html()+str+"<BR>");
    
    
    return getAbbreviation(dropped);
} 








function abbreviate(word, size, alpha, digraph, monograph, correlationMatrix, dropProb){
    var letters = [];
    
    var total=0;
    for (a in alpha){
        for(b in alpha[a].pair){
            total+= parseInt(alpha[a].pair[b].max);
        }
    }

    var dropped = [];
    var scale = getDropProb(dropProb, word.length);
    
    for (var w=0; w<word.length;w++){
        var l = word[w].toUpperCase();
        
        if (w==0){
            var score = parseFloat(monograph[word[w].rank]*(1-scale[w]/100));
        }else{        
            var score = parseFloat(correlationMatrix[labels.indexOf(word[w-1].toUpperCase())][labels.indexOf(l)] * (1-scale[w]/100));
        }
        
        var letter = {char: word[w], mono: score, deleted: 0};
        
        if (isNaN(letter.mono))
            letter.mono = -1;

        dropped.push(letter);        
    }
//    console.log(dropped);
    
    
    var i=0, str="";
    
//    str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));

    while((countNonDeleted(dropped)>size) && (countNonDeleted(dropped)>0) && (i<countNonDeleted(dropped))){
        i++;
        var max = -1;
        for (var i=0; (max==-1 && i<dropped.length); i++){
            if (dropped[i].deleted==0)
                max = i;
        }
        
        for (a in dropped ){
            if ((dropped[a].deleted==0)&&(dropped[a].mono>=dropped[max].mono)){
                max = a;
            }
        }
        dropped[max].deleted = 1;
        
//        str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));
    }
//    str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));
//    $("#word").html($("#word").html()+str+"<BR>");
    
    
    return getAbbreviation(dropped);
} 


function abbreviateTweet(word, size, alpha, digraph, monograph, correlationMatrix, dropProb){
    var letters = [];
    
    var total=0;
    for (a in alpha){
        for(b in alpha[a].pair){
            total+= parseInt(alpha[a].pair[b].max);
        }
    }

    var dropped = [];
    var scale = getDropProb(dropProb, word.length);
    
    for (var w=0; w<word.length;w++){
        if(word[w].match("[^a-zA-Z]+")){
            var letter = {char: word[w], mono: -1, deleted: 0};
            
        }else{
            var l = word[w].toUpperCase();
            if (w==0){                
                var score = parseFloat(monograph[word[w].rank]*(1-scale[w]/100));
            }else {
                if(word[w-1].match("[^a-zA-Z]+")){
                    var score = parseFloat(monograph[l].rank * (1-scale[w]/100));
                    var letter = {char: word[w], mono: score, deleted: 0};            
                }else{        
                    var score = parseFloat(correlationMatrix[labels.indexOf(word[w-1].toUpperCase())][labels.indexOf(l)] * (1-scale[w]/100));
                }                
            }

            var letter = {char: word[w], mono: score, deleted: 0};
        }
        
        if (isNaN(letter.mono))
            letter.mono = -1;

        dropped.push(letter);        
    }
//    console.log(dropped);
    
    
    var i=0, str="";
    
//    str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));

    while((countNonDeleted(dropped)>size) && (countNonDeleted(dropped)>0) && (i<countNonDeleted(dropped))){
        i++;
        var max = -1;
        for (var i=0; (max==-1 && i<dropped.length); i++){
            if (dropped[i].deleted==0)
                max = i;
        }
        
        for (a in dropped ){
            if ((dropped[a].deleted==0)&&(dropped[a].mono>=dropped[max].mono)){
                max = a;
            }
        }
        dropped[max].deleted = 1;
        
//        str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));
    }
//    str += " "+ (getAbbreviation(dropped) + "  ,  " + countNonDeleted(dropped));
//    $("#word").html($("#word").html()+str+"<BR>");
    
    
    return getAbbreviation(dropped);
}

    
    function getDropProb(prob, size){
        var aux = [], newScale = [];
        for (var i=0;i<size;i++){
            newScale[i] = [];    
        }
        var max = size-1;
        for (p in prob){
            aux[p] = parseInt((max/prob[prob.length-1].position) * (p-prob[prob.length-1].position) + max);
        }
        for (a in aux){
            newScale[aux[a]].push(prob[a].prob);
        }
        
        var scale = [];
        for (n in newScale){
            var sum = 0;
            for (s in newScale[n]){
                sum += parseFloat(newScale[n][s]);
            }
            scale[n] = parseFloat(sum/newScale[n].length);
        }
        
        return scale;
    }
    
    function getAbbreviation(letters){
        var abb = "";
        for(a in letters){
            if(letters[a].deleted==0)
                abb += letters[a].char;
        }
        return abb;
    }
    
    function countNonDeleted(letters){
        var size =0;
        for(a in letters){
            if(letters[a].deleted==0)
                size++;
        }
        return size;
    }
    
    function getDrop1(alpha, digraph){
            var matrix = [], str=[], total = 0;
            
            for (a in alpha){
                for(b in alpha[a].pair){
                    total+= parseInt(alpha[a].pair[b].max);
                }
            }
            var maxDB = alpha['A'].pair['B'].max/total;
            
            for (a in alpha){
                for(b in alpha[a].pair){
                    if (maxDB<(alpha[a].pair[b].max/total))
                        maxDB = (alpha[a].pair[b].max/total);
                }
            }
            
            var max = parseFloat((alpha['A'].pair['B'].max/total)*digraph['AB'].freq*calcAccuracy(alpha['A'].pair['B'].accuracy));
            
            
            for (a in alpha){
                var vec = [];
                for(b in alpha[a].pair){
                    var info = alpha[a].pair[b];
                    
//                    var c = parseFloat(calcAccuracy(info.accuracy));
//                    var c = parseFloat((info.dropAfter/info.max)*calcAccuracy(info.accuracy));
                    var c = parseFloat((info.dropAfter/info.max)*(info.max/total)*calcAccuracy(info.accuracy));
//                    var c = parseFloat((info.dropAfter/info.max)*(info.max/total));
//                    var c = parseFloat(info.dropAfter/info.max);
//                    var c = parseFloat(((info.max/total))*digraph[a+b].freq*calcAccuracy(info.accuracy));
//                    var c = parseFloat(((info.drop/info.max))*digraph[a+b].freq*(info.max/total)*calcAccuracy(info.accuracy));
//                    var c = parseFloat(digraph[a+b].freq*calcAccuracy(info.accuracy));
//                    var c = parseFloat(((info.drop/info.max))*digraph[a+b].freq*calcAccuracy(info.accuracy));
                    //var c = parseFloat(((info.max/total))*digraph[a+b].freq);
                    
                    if (c>max)
                        max = c;
                    vec.push(c);    
                }  
                matrix.push(vec);
            }  
            
            for (m in matrix){
                for (v in matrix[m]){
                    matrix[m][v] = matrix[m][v] / max;
                }
            }
            
//            console.log(matrix);
            
            //console.log(matrix);
            return matrix;
            //return orderby(str,$('#order').val());
        }