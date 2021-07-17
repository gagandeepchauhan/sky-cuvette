import React,{useState,useEffect}  from 'react'

export default function Range({minValue,maxValue,setMinValue,setMaxValue}) {
	useEffect(()=>{
		var inputLeft = document.getElementById("input-left");
		var inputRight = document.getElementById("input-right");

		var thumbLeft = document.querySelector(".slider > .thumb.left");
		var thumbRight = document.querySelector(".slider > .thumb.right");
		var range = document.querySelector(".slider > .range");
		
		function setLeftValue() {
			var _this = inputLeft,
				min = parseInt(_this.min),
				max = parseInt(_this.max);
		
			_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
		
			var percent = ((_this.value - min) / (max - min)) * 100;
		
			thumbLeft.style.left = percent + "%";
			range.style.left = percent + "%";
		}
		setLeftValue();
		
		function setRightValue() {
			var _this = inputRight,
				min = parseInt(_this.min),
				max = parseInt(_this.max);
			_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

			var percent = ((_this.value - min) / (max - min)) * 100;

			thumbRight.style.right = (100 - percent) + "%";
			range.style.right = (100 - percent) + "%";
		}
		setRightValue();
		
		function thumbLeftHoverOver() {
			thumbLeft.classList.add("hover");
		};
		function thumbLeftHoverOut() {
			thumbLeft.classList.remove("hover");
		};
		function thumbLeftActiveDown() {
			thumbLeft.classList.add("active");
		};
		function thumbLeftActiveUp() {
			thumbLeft.classList.remove("active");
		};
		function thumbRightHoverOver() {
			thumbRight.classList.add("hover");
		};
		function thumbRightHoverOut() {
			thumbRight.classList.remove("hover");
		};
		function thumbRightActiveDown() {
			thumbRight.classList.add("active");
		};
		function thumbRightActiveUp() {
			thumbRight.classList.remove("active");
		};
		
		inputLeft.addEventListener("input", setLeftValue);
		inputRight.addEventListener("input", setRightValue);

		inputLeft.addEventListener("mouseover",thumbLeftHoverOut)
		inputLeft.addEventListener("mouseout",thumbLeftHoverOut)
		inputLeft.addEventListener("mousedown", thumbLeftActiveDown)
		inputLeft.addEventListener("mouseup",thumbLeftActiveUp)
		
		inputRight.addEventListener("mouseover",thumbRightHoverOver)
		inputRight.addEventListener("mouseout",thumbRightHoverOut)
		inputRight.addEventListener("mousedown",thumbRightActiveDown)
		inputRight.addEventListener("mouseup",thumbRightActiveUp)
		return ()=>{
				inputLeft.removeEventListener("input", setLeftValue);
				inputRight.removeEventListener("input", setRightValue);	
		
				inputLeft.removeEventListener("mouseover",thumbLeftHoverOver);
				inputLeft.removeEventListener("mouseout",thumbLeftHoverOut)
				inputLeft.removeEventListener("mousedown", thumbLeftActiveDown)
				inputLeft.removeEventListener("mouseup",thumbLeftActiveUp)
		
				inputRight.removeEventListener("mouseover",thumbRightHoverOver)
				inputRight.removeEventListener("mouseout",thumbRightHoverOut)
				inputRight.removeEventListener("mousedown",thumbRightActiveDown)
				inputRight.removeEventListener("mouseup",thumbRightActiveUp)
			}
		},[])
	return (
		<div className="middle">
				<p align="center" className='light-para'>(min-{minValue}/- and max-{maxValue}/-)</p>
				<div className="multi-range-slider">
					<input type="range" id="input-left" min="0" max="100000" onInput={(e)=>setMinValue(e.target.value)} value={minValue}/>
					<input type="range" id="input-right" min="0" max="100000" onInput={(e)=>setMaxValue(e.target.value)} value={maxValue}/>
			
					<div className="slider">
						<div className="track"></div>
						<div className="range"></div>
						<div className="thumb left"></div>
						<div className="thumb right"></div>
					</div>
				</div>
		</div>
	)
}