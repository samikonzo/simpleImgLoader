var l = console.log;
var slider, tmpl;

document.addEventListener("DOMContentLoaded", ready);

function ready(){
	slider = document.querySelector('.slider')
	tmpl = document.getElementById('slider-item__template').innerHTML
	createSlide()
}


function createSlide(){
	var el = document.createElement('div')
	el.innerHTML = tmpl
	el = el.firstElementChild;

	var img = el.querySelector('img')
	var msk = el.querySelector('div')

	setTimeout(function f(){ 
		getImg(img,msk)
		
		setTimeout(f, 1000)
	}, 0)

	slider.appendChild(el)
}

function getImg(img, msk){
	var xhr = new XMLHttpRequest()
	xhr.open('GET', 'nextImg', true)

	xhr.onload = function(e){
		if(this.status == 200){
			img.onload = function(){
				msk.classList.add('slider-item__mask--hidden')
			}

			img.src = this.response
		} else {
			l('status :', this.status)
		}
	}

	xhr.send()
}