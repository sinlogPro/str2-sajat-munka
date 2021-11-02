
const btn_ModalOpen = document.querySelector('.btn__modal-open');
const btn_closeButton = document.querySelector('.modal__closeButton');
const btn_OK = document.querySelector('.btn__ok');
const btn_cancel = document.querySelector('.btn__cancel');


const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal__content');


btn_ModalOpen.addEventListener('click', OpenModal);
btn_closeButton.addEventListener('click', CloseModal);
btn_OK.addEventListener('click', CloseModal);
btn_cancel.addEventListener('click', CloseModal);

function OpenModal() {
    //modal.setAttribute('style', 'display : block;');
    modal.style.display = 'block';
    modal.content.focus();
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


async function CloseModal() {
    //modal.setAttribute('style', 'display : none');
    //modal.content.blur();
    modal.style.animationName = `eliminate`;
    modal.style.animationDuration = `1s`;
    await delay(.95 * 1000);
    modal.style.animationName = `animate`;
    modal.style.animationDuration = `1s`;
        
    modal.style.display = 'none';
}

window.onclick = function(ev) {
    if (ev.target == modal) {
        CloseModal();
    }
  }