function getNewTimeStamp()
{
    const now = new Date();
    let result = '';

    result += leftPad(now.getDate());
    result += '/';
    result += leftPad(now.getMonth() + 1);
    result += '/';
    result += now.getFullYear();
    result += ' ';
    result += now.getHours();
    result += ':';
    result += now.getMinutes();
    result += ':';
    result += now.getSeconds();
    result += '.';
    result += leftPad(now.getMilliseconds(),3);

    return result;
};


function leftPad(value , count = 2 , char = '0' ){
    let newvalue = value.toString();
    if ( value.toString().length  < count )
    {
        for( let i = 0 ; i < count - value.toString().length ; i++){
            newvalue = char + value;
        }
    } 

    return newvalue ;
};