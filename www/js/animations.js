angular.module('ARVeo.animations',[])
.animation('.btn', function(){
	return{
		beforeAddClass: function(element, className, done){
			if(className == 'ng-hide'){
				TweenMax.to(element, 1, {scale: 0, opacity: 0, ease: Back.easeOut, onComplete: done});
			}else{
				done();
			}
		},
		removeClass: function(element, className, done){
			if(className == 'ng-hide'){
				TweenMax.set(element, {display: 'block', scale: 0, opacity: 0});
				TweenMax.to(element, 0.5, {opacity: 1, scale: 1, ease: Back.easeOut});
			}else{
				done();
			}
		}
	}
});