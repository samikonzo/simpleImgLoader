var l = console.log;
var main, mainImgDiv, mainInfoDiv, mainImg,
	sliderContainer,
	sliderWrapper,
	sliderWrapperWidth,
	sliderArrowLeft, sliderArrowRight,
	slider,
	tmpl;

document.addEventListener("DOMContentLoaded", ready);

function ready(){
	//define variables
	main = document.querySelector('.main')
	mainImgDiv = main.querySelector('.main__img')
	mainImg = mainImgDiv.querySelector('img')
	mainInfoDiv = main.querySelector('.main__info')
	sliderContainer = document.querySelector('.slider-container')
	sliderWrapper = sliderContainer.querySelector('.slider-wrapper')
	sliderWrapperWidth = sliderWrapper.offsetWidth
	sliderArrowLeft = sliderContainer.querySelector('.slider-container__arrow-left')
	sliderArrowRight = sliderContainer.querySelector('.slider-container__arrow-right')
	slider = sliderContainer.querySelector('.slider')
	slider.count = slider.querySelectorAll('.slider-item').length;
	tmpl = document.getElementById('slider-item__template').innerHTML





	//show slider
	setTimeout(function(){
		slider.style.left = '0px';
		slider.style.opacity = 1;

		//add first imgs
		getFirstImgs()

	}, 10)

	

	//autochoose first img
}


function getFirstImgs(){
	//check width
	if(slider.offsetWidth < sliderWrapperWidth){
		getNextImgUrl()
			.then(
				responce => {
					// create slide 
					var slide = createSlide()
					
					// add img
					var img = slide.querySelector('img')
					var mask = slide.querySelector('div')
					img.onload = function(){
						mask.classList.add('slider-item__mask--hidden')
					}
					img.src = responce

					//choose first img
					if(slider.count==1){
						imageChoose(img.src)
					}

					// recurse getFirstImgs
					getFirstImgs()
				},
				error => {
					//break
				}
			)	
	}
}

function getNextImgUrl(){
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest()
		xhr.open('POST', 'nextImg', true)
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.onload = function(e){
			if(this.status == 200){
				resolve(this.response)

			} else {
				var error = new Error(this.statusText)
				error.code = this.status
				reject(error)
			}
		}

		var body = 'count='+ encodeURIComponent(slider.count++)
		xhr.send(body)
	})
}

function createSlide(){
	var el = document.createElement('div')
	el.innerHTML = tmpl
	el = el.firstElementChild;
	slider.appendChild(el)
	return el
}

function imageChoose(url){
	//hide previous
	var promise = new Promise((resolve, reject) => {
		mainImgDiv.style.opacity = 0;
		setTimeout(function(){
			resolve()
		}, 1000)
	})
	//open current

	promise.then(() => {
		mainImg.src = url
	}).then(() => {
		mainImgDiv.style.opacity = 1;
	})
}


