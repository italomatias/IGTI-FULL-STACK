const clickArray = [];

window.addEventListener('load', ()=>{

    const button = document.querySelector('#clickButton');

    button.addEventListener('click' , handlebuttonclick);

} );

function handlebuttonclick(){
    clickArray.push(getNewTimeStamp());
    render();    
}

function render() {
    const ul = document.querySelector('#data');
    ul.innerHTML = '';
    let lis ='';
    clickArray.map(item => {
        lis += `<li> ${item} </li>`;
    });

    ul.innerHTML = lis;

    document.title = clickArray.length;
}