const clickArray = [];

window.addEventListener('load', ()=>{

    const button = document.querySelector('#clickButton');

    button.addEventListener('click' , handlebuttonclick);

} );

function handlebuttonclick(){
    const item = getNewTimeStamp();
    clickArray.push(item);
    render(item);    
}

function render(item) {
    
    const ul = document.querySelector('#data');    
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);

    // ul.innerHTML = '';
    // let lis ='';
    // clickArray.map(item => {
    //     lis += `<li> ${item} </li>`;
    // });

    // ul.innerHTML = lis;

    document.title = clickArray.length;
}