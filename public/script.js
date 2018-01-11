var l = console.log;
var slider, tmpl;

document.addEventListener("DOMContentLoaded", ready);

function ready(){
	slider = document.querySelector('.slider')
	slider.count = 0;
	tmpl = document.getElementById('slider-item__template').innerHTML
	
	//show slider
	setTimeout(function(){
		slider.style.left = '0px';
		slider.style.opacity = 1;
	}, 10)

	//add first imgs
	for(var i = 0; i < 10; i++){
		createSlide()
	}
}


function createSlide(){
	var el = document.createElement('div')
	el.innerHTML = tmpl
	el = el.firstElementChild;

	var img = el.querySelector('img')
	var msk = el.querySelector('div')

	img.el = el;

	getImg(img, msk)
	slider.appendChild(el)
}

function getImg(img, msk){
	var xhr = new XMLHttpRequest()
	xhr.open('POST', 'nextImg', true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xhr.onload = function(e){
		if(this.status == 200){
			l(this.response)
			img.onload = function(){
				msk.classList.add('slider-item__mask--hidden')
			}

			img.src = this.response

		} else {
			l('status :', this.statusText)
			img.el.remove()
		}
	}

	var body = 'count='+ encodeURIComponent(slider.count++)

	xhr.send(body)
}